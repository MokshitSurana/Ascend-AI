from fastapi import FastAPI
from video import gen
import asyncio
from audio import voice_recording, predict_emotions_in_segments
import base64
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class ImageRequest(BaseModel):
    image_base64: str


@app.post("/get_image")
async def video(request: ImageRequest):
    image_base64 = request.image_base64
    image_base64 = image_base64.split(",")[1]
    raw_img = base64.b64decode(image_base64)
    with open("b.png", "wb") as fh:
        fh.write(raw_img)
    gen("b.png")


@app.get("/video_analyze")
async def video_analyze():
    predictions = []
    with open("histo.txt", "r") as f:
        predictions.extend(line.strip() for line in f)
    return predictions


@app.post("/analyze_audio")
async def analyze_audio(duration: int):
    filename = f"recording-{duration}.wav"
    loop = asyncio.get_event_loop()
    await loop.run_in_executor(None, voice_recording, filename, duration)
    return {"emotion" : predict_emotions_in_segments(filename)}
