# Transcript GPA Calculator

## Introduction

Many students face the challenge of displaying their major GPAs on their resumes, especially when the cumulative GPA includes unrelated courses. This web app simplifies the process by allowing users to upload their transcripts, automatically extracting and presenting course details. Users can effortlessly select major-related courses to calculate their major GPA.

## Features

- **Transcript Upload:** Users can upload their transcripts in image format.

- **Automatic Extraction:** The web app utilizes Tesseract JS for optical character recognition, extracting course information such as name, code, credit, and grade.

- **User-Friendly Interface:** The front-end is built with ReactJS, featuring an intuitive interface using ANT Design's UI library.

- **Course Selection:** Users can easily select major-related courses from the displayed list using an interactive double-column transfer choice box interface.

- **Search Functionality:** A search bar is included to quickly find and select specific courses.

## How it Works

1. **Transcript Upload:** Users upload their transcript images.
2. **Text Extraction:** Tesseract JS extracts text from the images, providing a string with all detected characters.
3. **Regular Expressions:** Regular expressions are used to extract relevant information (course name, code, credit, grade) from the string.
4. **Data Presentation:** Extracted information is structured into JavaScript object notation and presented in an organized list.

## Building the Project

- **Front-End:** ReactJS is employed for the front-end, utilizing ANT Design's UI library for a visually appealing and user-friendly interface.

- **Back-End:** NodeJS is used to implement Tesseract JS for optical character recognition.

- **Challenges:** Designing regular expressions posed a challenge due to varied formatting, special characters, and spaces. Patterns were carefully crafted to account for potential discrepancies.

## Challenges Overcame

- **Regular Expressions:** The main challenge was designing accurate regular expressions to extract data. Challenges included handling different formatting, special characters, and spaces. Patterns were adjusted to ensure recognition of potential variations.

## What I Learned

Building this project provided valuable learning experiences, particularly in the areas of optical character recognition and regular expressions. These skills have expanded my technical capabilities, and I plan to apply them in future projects.

Feel free to try it out!
