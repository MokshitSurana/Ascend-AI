from tensorflow.keras.models import load_model
import time
import pyaudio
import wave
import librosa
import numpy as np
import pickle
import soundfile as sf


model = load_model("Models/audio.hdf5", compile=False)


with open("./Models/scaler2.pickle", "rb") as f:
    scaler2 = pickle.load(f)

emotions = {
    0: "angry",
    1: "disgust",
    2: "fear",
    3: "happy",
    4: "neutral",
    5: "sad",
    6: "surprise",
}


def voice_recording(filename, duration=10, sample_rate=16000, chunk=1024, channels=1):
    """
    Records voice input from a microphone and saves it to a WAV file.

    Args:
        filename (str): The name of the output WAV file.
        duration (float, optional): The duration of the recording in seconds. Defaults to 10.
        sample_rate (int, optional): The sample rate of the recording. Defaults to 16000.
        chunk (int, optional): The number of audio frames per buffer. Defaults to 1024.
        channels (int, optional): The number of audio channels. Defaults to 1.

    Returns:
        None

    Example:
        ```python
        voice_recording("output.wav", duration=5, sample_rate=44100, chunk=2048, channels=2)
        ```"""

    p = pyaudio.PyAudio()
    stream = p.open(
        format=pyaudio.paInt16,
        channels=channels,
        rate=sample_rate,
        input=True,
        frames_per_buffer=chunk,
    )

    frames = []

    print("Started Recording")
    stream.start_stream()
    start_time = time.time()
    current_time = time.time()

    while (current_time - start_time) < duration:
        data = stream.read(chunk)

        frames.append(data)
        current_time = time.time()

    stream.stop_stream()
    stream.close()
    p.terminate()
    print("Ended Recording")

    wf = wave.open(filename, "w")
    wf.setnchannels(channels)
    wf.setsampwidth(p.get_sample_size(pyaudio.paInt16))
    wf.setframerate(sample_rate)
    wf.writeframes(b"".join(frames))
    wf.close()


def zcr(data, frame_length, hop_length):
    zcr = librosa.feature.zero_crossing_rate(
        data, frame_length=frame_length, hop_length=hop_length
    )
    return np.squeeze(zcr)


def rmse(data, fl=2048, hl=512):
    rmse = librosa.feature.rms(y=data, frame_length=fl, hop_length=hl)
    return np.squeeze(rmse)


def mfcc(data, sr, frame_length=2048, hop_length=512, flatten: bool = True):
    mfcc = librosa.feature.mfcc(y=data, sr=sr)
    return np.ravel(mfcc.T) if flatten else np.squeeze(mfcc.T)


def extract_features(data, sr=22050, frame_length=2048, hop_length=512):
    result = np.array([])

    result = np.hstack(
        (
            result,
            zcr(data, frame_length, hop_length),
            rmse(data, frame_length, hop_length),
            mfcc(data, sr, frame_length, hop_length),
        )
    )
    return result


def predict_emotion_from_file(
    filename,
):
    d, s_rate = librosa.load(filename, duration=2.5, offset=0.6)
    res = extract_features(d)
    result = np.array(res)
    
    result = np.reshape(result, newshape=(1, 2376))
    i_result = scaler2.transform(result)
    
    final_result = np.expand_dims(i_result, axis=2)
    predictions = model.predict(final_result)
    return emotions[np.argmax(predictions)]


def predict_emotions_in_segments(filename, segment_length=4):
    full_audio, sr = librosa.load(filename)

    segments = []
    hop_length = int(sr * segment_length)
    for i in range(0, len(full_audio), hop_length):
        segment = full_audio[i : i + hop_length]
        segments.append(segment)

    predictions = []
    for segment in segments:
        sf.write('temp.wav', segment, sr)
        
        prediction = predict_emotion_from_file('temp.wav')
        predictions.append(prediction)

    return predictions
