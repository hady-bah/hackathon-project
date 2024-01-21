const T = require("tesseract.js")//importing tesseract


T.recognize('./ocrtest2.png', 'eng', { logger: e => console.log(e) })//path to image, language, log to show progress
    .then(out => {
      const recognizedText = out.data.text;//stores recognized text into a variable
      console.log(recognizedText);//outputs recognized text

      // Defining an expression pattern to match course information
      const coursePattern = /([A-Z]+\s\d+)\s(.+?)\s(\d+\.\d+)\s([A-Z][\+-]?)\n/g;

     // Find all matches in the text
     const matches = [...recognizedText.matchAll(coursePattern)];

    // Print the extracted course information
    for (const match of matches) {
    console.log("Course Code:", match[1]);
    console.log("Course Name:", match[2]);
    console.log("Credits:", match[3]);
    console.log("Grade:", match[4]);
    console.log("-----------");
    }

    })
    .catch(error => console.error(error));


