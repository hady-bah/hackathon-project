const T = require("tesseract.js")//importing tesseract

T.recognize('./ocrtest2.png', 'eng', {logger: e => console.log(e)})//path to image, language, log to show progress
    .then(out => console.log(out.data.text))//returns promise, log out data specifically text 
