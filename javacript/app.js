const T = require("tesseract.js");

T.recognize('./uploads/ocrtest3.png', 'eng', { logger: e => console.log(e) }) 
 .then(result => {

  let text = result.data.text;
  console.log(text);

  // Standardize text
  text = text.toLowerCase();
  text = text.replace(/\s\s+/g, ' '); 
  
  // Split into lines
  const lines = text.split('\n');

  // Extract courses
  const courses = [];  
  let currentCourse;

  lines.forEach(line => {

    // Match course code 
    if (line.match(/([a-z]{3}\s\d{3})/)) {
      currentCourse = { 
        code: line.match(/([a-z]{3}\s\d{3})/)[1]
      };
      courses.push(currentCourse);
    }

    // Other course properties  
    if (line.includes('grade:')) {
      currentCourse.grade = line.split('grade:')[1].trim();
    } 

  });

  console.log(courses);

 })
 .catch(error => {
   console.log(error);  
 });
// const T = require("tesseract.js")//importing tesseract


// T.recognize('./uploads/ocrtest3.png', 'eng', { logger: e => console.log(e) })//path to image, language, log to show progress
//     .then(out => {
//       const recognizedText = out.data.text;//stores recognized text into a variable
//       console.log(recognizedText);//outputs recognized text

//      // Split the text into lines
//     const lines = recognizedText.split('\n');

//     // Initialize variables to store extracted information
//     let currentCourse = {};

//     // Iterate through each line
//     for (const line of lines) {
//     // Check if the line contains course code, name, credits, and grade
//     const courseMatch = line.match(/^([A-Z]+\s\d+)\s(.+?)\s(\d+\.\d+|\d+)\s([A-F][\+-]?|\d+)$/);

//     if (courseMatch) {
//         // If a match is found, store the information in the currentCourse object
//         currentCourse = {
//         code: courseMatch[1],
//         name: courseMatch[2],
//         credits: courseMatch[3],
//         grade: courseMatch[4],
//         };

//         // Output or process the extracted information as needed
//         console.log('Course Information:', currentCourse);
//     } else {
//         // Handle other lines or information not matching the course pattern
//         // You can add more conditions or patterns as needed
//     }
//     }

//         })
//     .catch(error => console.error(error));