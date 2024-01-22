const T = require("tesseract.js");
const fs = require('fs');

T.recognize('./uploads/ocrtest1.png', 'eng')//{ logger: e => console.log(e) } to track time 
 .then(result => {

  console.log(result.data.text);

  let text = result.data.text.toLowerCase(); 
  
  text = text.replace(/\s\s+/g, ' ');
  
  const lines = text.split('\n');

  const courses = [];

  lines.forEach(line => {
  
    let course = {};
  
    if (line.match(/([a-z]{3}\s\d{3})/i)) { 
      course.code = line.match(/([a-z]{3}\s\d{3})/i)[1];
  
    } else if (line.match(/(\d+\.\d+)\s([ABCDF]\+?)/)) {
      course.credits = parseFloat(line.match(/(\d+\.\d+)\s([ABCDF]\+?)/)[1]);  
      course.grade = line.match(/(\d+\.\d+)\s([ABCDF]\+?)/)[2];
    
    } else if (line.match(/grade/i)) {
      course.grade = line.match(/grade:\s([ABCDF]\+?)/i)[1];
    
    } else if (line.match(/credits/i)) { 
      course.credits = parseFloat(line.match(/credits:\s(\d+\.\d+)/i)[1]);
    }
  
    if (course.code) {  
      courses.push(course);
    }
  
  });
  
  const jsonData = JSON.stringify(courses, null, 2);
  
  fs.writeFileSync('courses.json', jsonData);

 })
 .catch(err => {
  console.log(err); 
 });


