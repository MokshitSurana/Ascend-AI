from __future__ import division
import numpy as np

import cv2
import dlib
from imutils import face_utils
from scipy.ndimage import zoom
from scipy.spatial import distance

from tensorflow.keras.models import load_model
from tensorflow.keras import backend as K

import time
import csv


def eye_aspect_ratio(eye):
    """
    Calculates the eye aspect ratio (EAR) based on the given eye landmarks.

    Args:
        eye (list): A list of 6 tuples representing the coordinates of the eye landmarks in the following order: [left_eye_left_corner, left_eye_right_corner, left_eye_top, left_eye_bottom, right_eye_left_corner, right_eye_right_corner].

    Returns:
        float: The calculated eye aspect ratio.

    Example:
        ```python
        eye_landmarks = [(30, 40), (60, 40), (45, 30), (45, 50), (70, 30), (100, 30)]
        ear = eye_aspect_ratio(eye_landmarks)
        print(ear)
        ```"""

    A = distance.euclidean(eye[1], eye[5])
    B = distance.euclidean(eye[2], eye[4])
    C = distance.euclidean(eye[0], eye[3])
    ear = (A + B) / (2.0 * C)

    return ear


def gen(filename):
    # video_capture = cv2.VideoCapture(0)
    frame = cv2.imread('a.jpg')
    shape_x = 48
    shape_y = 48

    # end = 0

    # (lStart, lEnd) = face_utils.FACIAL_LANDMARKS_IDXS["left_eye"]
    # (rStart, rEnd) = face_utils.FACIAL_LANDMARKS_IDXS["right_eye"]

    # (nStart, nEnd) = face_utils.FACIAL_LANDMARKS_IDXS["nose"]
    # (mStart, mEnd) = face_utils.FACIAL_LANDMARKS_IDXS["mouth"]
    # (jStart, jEnd) = face_utils.FACIAL_LANDMARKS_IDXS["jaw"]

    # (eblStart, eblEnd) = face_utils.FACIAL_LANDMARKS_IDXS["left_eyebrow"]
    # (ebrStart, ebrEnd) = face_utils.FACIAL_LANDMARKS_IDXS["right_eyebrow"]

    model = load_model("Models/video.h5", compile=False)
    face_detect = dlib.get_frontal_face_detector()
    predictor_landmarks = dlib.shape_predictor("Models/face_landmarks.dat")

    predictions = []

    # k = 0

    angry_0 = []
    disgust_1 = []
    fear_2 = []
    happy_3 = []
    sad_4 = []
    surprise_5 = []
    neutral_6 = []

    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
    rects = face_detect(gray, 1)

    for _, rect in enumerate(rects):
        (x, y, w, h) = face_utils.rect_to_bb(rect)
        face = gray[y : y + h, x : x + w]

        shape = predictor_landmarks(gray, rect)
        shape = face_utils.shape_to_np(shape)

        face = zoom(face, (shape_x / face.shape[0], shape_y / face.shape[1]))
        face = face.astype(np.float32)

        face /= float(face.max())
        face = np.reshape(face.flatten(), (1, 48, 48, 1))

        prediction = model.predict(face)
        print(prediction)
        angry_0.append(prediction[0][0].astype(float))
        disgust_1.append(prediction[0][1].astype(float))
        fear_2.append(prediction[0][2].astype(float))
        happy_3.append(prediction[0][3].astype(float))
        sad_4.append(prediction[0][4].astype(float))
        surprise_5.append(prediction[0][5].astype(float))
        neutral_6.append(prediction[0][6].astype(float))

        prediction_result = np.argmax(prediction)
        predictions.append(str(prediction_result))

        # cv2.rectangle(frame, (x, y), (x + w, y + h), (0, 255, 0), 2)

        # cv2.putText(
        #         frame,
        #         "Face #{}".format(i + 1),
        #         (x - 10, y - 10),
        #         cv2.FONT_HERSHEY_SIMPLEX,
        #         0.5,
        #         (0, 255, 0),
        #         2,
        #     )

        # for j, k in shape:
        #     cv2.circle(frame, (j, k), 1, (0, 0, 255), -1)

        # cv2.putText(
        #         frame,
        #         "----------------",
        #         (40, 100 + 180 * i),
        #         cv2.FONT_HERSHEY_SIMPLEX,
        #         0.5,
        #         155,
        #         0,
        # )
        # cv2.putText(
        #         frame,
        #         f"Emotional report : Face #{str(i + 1)}",
        #         (40, 120 + 180 * i),
        #         cv2.FONT_HERSHEY_SIMPLEX,
        #         0.5,
        #         155,
        #         0,
        # )
        # cv2.putText(
        #         frame,
        #         f"Angry : {str(round(prediction[0][0], 3))}",
        #         (40, 140 + 180 * i),
        #         cv2.FONT_HERSHEY_SIMPLEX,
        #         0.5,
        #         155,
        #         0,
        # )
        # cv2.putText(
        #         frame,
        #         f"Disgust : {str(round(prediction[0][1], 3))}",
        #         (40, 160 + 180 * i),
        #         cv2.FONT_HERSHEY_SIMPLEX,
        #         0.5,
        #         155,
        #         0,
        # )
        #     cv2.putText(
        #         frame,
        #         f"Fear : {str(round(prediction[0][2], 3))}",
        #         (40, 180 + 180 * i),
        #         cv2.FONT_HERSHEY_SIMPLEX,
        #         0.5,
        #         155,
        #         1,
        #     )
        #     cv2.putText(
        #         frame,
        #         f"Happy : {str(round(prediction[0][3], 3))}",
        #         (40, 200 + 180 * i),
        #         cv2.FONT_HERSHEY_SIMPLEX,
        #         0.5,
        #         155,
        #         1,
        #     )
        #     cv2.putText(
        #         frame,
        #         f"Sad : {str(round(prediction[0][4], 3))}",
        #         (40, 220 + 180 * i),
        #         cv2.FONT_HERSHEY_SIMPLEX,
        #         0.5,
        #         155,
        #         1,
        #     )
        #     cv2.putText(
        #         frame,
        #         f"Surprise : {str(round(prediction[0][5], 3))}",
        #         (40, 240 + 180 * i),
        #         cv2.FONT_HERSHEY_SIMPLEX,
        #         0.5,
        #         155,
        #         1,
        #     )
        #     cv2.putText(
        #         frame,
        #         f"Neutral : {str(round(prediction[0][6], 3))}",
        #         (40, 260 + 180 * i),
        #         cv2.FONT_HERSHEY_SIMPLEX,
        #         0.5,
        #         155,
        #         1,
        #     )

        #     if prediction_result == 0:
        #         cv2.putText(
        #             frame,
        #             "Angry",
        #             (x + w - 10, y - 10),
        #             cv2.FONT_HERSHEY_SIMPLEX,
        #             1,
        #             (0, 255, 0),
        #             2,
        #         )
        #     elif prediction_result == 1:
        #         cv2.putText(
        #             frame,
        #             "Disgust",
        #             (x + w - 10, y - 10),
        #             cv2.FONT_HERSHEY_SIMPLEX,
        #             1,
        #             (0, 255, 0),
        #             2,
        #         )
        #     elif prediction_result == 2:
        #         cv2.putText(
        #             frame,
        #             "Fear",
        #             (x + w - 10, y - 10),
        #             cv2.FONT_HERSHEY_SIMPLEX,
        #             1,
        #             (0, 255, 0),
        #             2,
        #         )
        #     elif prediction_result == 3:
        #         cv2.putText(
        #             frame,
        #             "Happy",
        #             (x + w - 10, y - 10),
        #             cv2.FONT_HERSHEY_SIMPLEX,
        #             1,
        #             (0, 255, 0),
        #             2,
        #         )
        #     elif prediction_result == 4:
        #         cv2.putText(
        #             frame,
        #             "Sad",
        #             (x + w - 10, y - 10),
        #             cv2.FONT_HERSHEY_SIMPLEX,
        #             1,
        #             (0, 255, 0),
        #             2,
        #         )
        #     elif prediction_result == 5:
        #         cv2.putText(
        #             frame,
        #             "Surprise",
        #             (x + w - 10, y - 10),
        #             cv2.FONT_HERSHEY_SIMPLEX,
        #             1,
        #             (0, 255, 0),
        #             2,
        #         )
        #     else:
        #         cv2.putText(
        #             frame,
        #             "Neutral",
        #             (x + w - 10, y - 10),
        #             cv2.FONT_HERSHEY_SIMPLEX,
        #             1,
        #             (0, 255, 0),
        #             2,
        #         )

        #     leftEye = shape[lStart:lEnd]
        #     rightEye = shape[rStart:rEnd]

        #     leftEAR = eye_aspect_ratio(leftEye)
        #     rightEAR = eye_aspect_ratio(rightEye)

        #     leftEyeHull = cv2.convexHull(leftEye)
        #     rightEyeHull = cv2.convexHull(rightEye)
        #     cv2.drawContours(frame, [leftEyeHull], -1, (0, 255, 0), 1)
        #     cv2.drawContours(frame, [rightEyeHull], -1, (0, 255, 0), 1)

        #     nose = shape[nStart:nEnd]
        #     noseHull = cv2.convexHull(nose)
        #     cv2.drawContours(frame, [noseHull], -1, (0, 255, 0), 1)

        #     mouth = shape[mStart:mEnd]
        #     mouthHull = cv2.convexHull(mouth)
        #     cv2.drawContours(frame, [mouthHull], -1, (0, 255, 0), 1)

        #     jaw = shape[jStart:jEnd]
        #     jawHull = cv2.convexHull(jaw)
        #     cv2.drawContours(frame, [jawHull], -1, (0, 255, 0), 1)

        #     ebr = shape[ebrStart:ebrEnd]
        #     ebrHull = cv2.convexHull(ebr)
        #     cv2.drawContours(frame, [ebrHull], -1, (0, 255, 0), 1)

        #     ebl = shape[eblStart:eblEnd]
        #     eblHull = cv2.convexHull(ebl)
        #     cv2.drawContours(frame, [eblHull], -1, (0, 255, 0), 1)

        # cv2.putText(
        #     frame,
        #     f"Number of Faces : {len(rects)}",
        #     (40, 40),
        #     cv2.FONT_HERSHEY_SIMPLEX,
        #     1,
        #     155,
        #     1,
        # )

        # cv2.imwrite("tmp/t.jpg", frame)

        # yield (
        #     b"--frame\r\n"
        #     b"Content-Type: image/jpeg\r\n\r\n"
        #     + open("tmp/t.jpg", "rb").read()
        #     + b"\r\n"
        # )
    with open("./histo_perso.txt", "w") as d:
            d.write("density" + "\n")
            for val in predictions:
                d.write(str(val) + "\n")

    with open("./histo.txt", "a") as d:
            for val in predictions:
                d.write(str(val) + "\n")

    rows = zip(angry_0, disgust_1, fear_2, happy_3, sad_4, surprise_5, neutral_6)

    with open("./prob.csv", "w") as d:
            writer = csv.writer(d)
            for row in rows:
                writer.writerow(row)

    with open("./prob_tot.csv", "a") as d:
            writer = csv.writer(d)
            for row in rows:
                writer.writerow(row)
                
    return predictions
