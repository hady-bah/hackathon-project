const fs = require('fs');
const T = require('tesseract.js');

T.recognize('./uploads/ocrtest4.png', 'eng') // { logger: e => console.log(e) } to track time
  .then((result) => {
    console.log(result.data.text);

    let text = result.data.text;

   // Define regular expressions to extract relevant information
const coursePattern = /\b([A-Z]+\s*\d+)\s+([\w\s]+)\s+(\d+\.\d+)\s+([A-F][\+\-]?)/g;
const gradePattern = /Term GPA:\s+(\d+\.\d+)/;

// Find all matches in the text
const courseMatches = [...text.matchAll(coursePattern)];
const gradeMatches = text.match(gradePattern);

// Create a list to store course information
const courses = [];

// Iterate through the matches and append the extracted information to the list
for (let i = 0; i < courseMatches.length; i++) {
  const [, courseCode, courseName, creditHours, grade] = courseMatches[i];

  const courseInfo = {
    "code": courseCode,
    "name": courseName,
    "credits": parseFloat(creditHours),
    "grade": grade
  };

  courses.push(courseInfo);
}

// Generate a unique key for each course
const coursesWithKeys = courses.map((course, index) => ({ ...course, key: index + 1 }));

// Log the list of courses to the console
console.log("Courses Data:");
console.log(coursesWithKeys);

// Write the list of courses to a JSON file with unique keys
const jsonData = JSON.stringify(coursesWithKeys, null, 2);
fs.writeFileSync('courses.json', jsonData);
  })
  .catch((err) => {
    console.log(err);
  });
