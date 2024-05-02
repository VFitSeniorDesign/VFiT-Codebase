import cv2
import dlib
import numpy as np
from scipy.spatial import distance as dist
import logging
import os

# Initialize logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

def process_image(image):
    # Initialize dlib's face detector (HOG-based) and the facial landmark predictor
    detector = dlib.get_frontal_face_detector()
    print("FILE PATH: ", os.getcwd())
    predictor = dlib.shape_predictor("./api/shape_predictor_68_face_landmarks.dat")

    def detect_faces(img):
        gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
        faces = detector(gray, 1)
        if not faces:
            logging.error("No faces detected in the image.")
            raise ValueError("No faces detected in the image.")
        return faces

    def get_landmarks(img, face):
        return predictor(img, face)

    def find_ruler(img):
        gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
        edges = cv2.Canny(gray, 50, 150, apertureSize=3)
        lines = cv2.HoughLinesP(edges, 1, np.pi/180, threshold=100, minLineLength=100, maxLineGap=10)
        if lines is not None:
            longest_line = max(lines, key=lambda x: np.linalg.norm([x[0][0] - x[0][2], x[0][1] - x[0][3]]))
            x1, y1, x2, y2 = longest_line[0]
            cv2.line(img, (x1, y1), (x2, y2), (0, 255, 0), 2)  # Draw the ruler line in green
            ruler_length_pixels = np.linalg.norm([x1 - x2, y1 - y2])
            ruler_length_cm = 15
            return ruler_length_pixels / ruler_length_cm
        else:
            raise ValueError("Ruler not detected")

    def calculate_measurements(landmarks, pixels_per_cm, img):
        points = np.array([(p.x, p.y) for p in landmarks.parts()], dtype="double")
        feature_colors = {
            "Eye Distance": (255, 0, 0),
            "Eye Width": (0, 255, 0),
            "Eye Height": (0, 0, 255),
            "Nose Width": (255, 255, 0),
            "Nose Height": (0, 255, 255),
            "Jaw Width": (255, 0, 255),
            "Lip Width": (75, 180, 60),
            "Chin Width": (180, 75, 175),
            "Chin Height": (80, 170, 210),
            "Forehead Height": (255, 165, 0)
        }
        measurements = {}
        feature_points = {
            "Eye Distance": (36, 45),
            "Eye Width": (36, 39),
            "Eye Height": (37, 41),
            "Nose Width": (31, 35),
            "Nose Height": (27, 33),
            "Jaw Width": (0, 16),
            "Lip Width": (48, 54),
            "Chin Width": (7, 9),
            "Chin Height": (8, 57),
            "Forehead Height": (27, 8)
        }
        for feature, (p1, p2) in feature_points.items():
            color = feature_colors[feature]
            cv2.line(img, (int(points[p1][0]), int(points[p1][1])), (int(points[p2][0]), int(points[p2][1])), color, 2)
            dist_pixels = dist.euclidean(points[p1], points[p2])
            measurements[feature + " (cm)"] = dist_pixels / pixels_per_cm
            measurements[feature + " (pixel)"] = dist_pixels

        return measurements, img

    def conversion(measurements):
        blender_conversion = {}
        for  k, v in measurements.items():
            if k == "Eye Distance (cm)":
                if v < 7.75:
                    blender_conversion["Eye Distance"] = 1.5
                elif v > 11.75:
                    blender_conversion["Eye Distance"] = -1.5
                else:
                    blender_conversion["Eye Distance"] = -((measurements[k] - 9.5) * .75)

            elif k == "Eye Width (cm)":
                if v < 2.15:
                    blender_conversion["Eye Width"] = -2
                elif v > 2.85:
                    blender_conversion["Eye Width"] = 2
                else:
                    blender_conversion["Eye Width"] = (measurements[k] - 2.5) * (2/.35)
            
            elif k == "Eye Height (cm)":
                if v < 0.6:
                    blender_conversion["Eye Height"] = -2
                elif v > 1.1:
                    blender_conversion["Eye Height"] = 2
                else:
                    blender_conversion["Eye Height"] = (measurements[k] - .85) * (4/.5)
            
            elif k == "Nose Width (cm)":
                if v < 3:
                    blender_conversion["Nose Width"] = -1.5
                elif v > 5:
                    blender_conversion["Nose Width"] = 1.5
                else:
                    blender_conversion["Nose Width"] = (measurements[k] - 4) * (3/2)

            elif k == "Nose Height (cm)":
                if v < 4.8:
                    blender_conversion["Nose Height"] = 2
                elif v > 5.1:
                    blender_conversion["Nose Height"] = -2
                else:
                    blender_conversion["Nose Height"] = -((measurements[k] - 4.95) * (4/.3))

            elif k == "Lip Width (cm)":
                if v < 4.8:
                    blender_conversion["Lip Width"] = -2
                elif v > 6.66:
                    blender_conversion["Lip Width"] = 2
                else:
                    blender_conversion["Lip Width"] = (measurements[k] - 5.73) * (2/.93)

            elif k == "Chin Width (cm)":
                if v < 2.4:
                    blender_conversion["Chin Width"] = -2
                elif v > 5.5:
                    blender_conversion["Chin Width"] = 2
                else:
                    blender_conversion["Chin Width"] = (measurements[k] - 3.975) * (4/3.1)
            
            elif k == "Chin Height (cm)":
                if v < 1.8:
                    blender_conversion["Chin Height"] = -2
                elif v > 3.3:
                    blender_conversion["Chin Height"] = 2
                else:
                    blender_conversion["Chin Height"] = (measurements[k] - 2.55) * (4/1.5)
        
        return blender_conversion

    faces = detect_faces(image)
    if faces:
        pixels_per_cm = find_ruler(image)
        landmarks = get_landmarks(image, faces[0])
        measurements, image_with_annotations = calculate_measurements(landmarks, pixels_per_cm, image)

        converted = conversion(measurements)
        return converted

