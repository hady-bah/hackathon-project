const T = require("tesseract.js")

T.recognize('./ocrtest1.png', 'eng', {logger: e => console.log(e)})
    .then(out => console.log(out.data.text))
