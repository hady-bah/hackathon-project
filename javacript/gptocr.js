const axios = require('axios');
const fs = require('fs');
const path = require('path');
const base64 = require('base64-js');

// Function to encode the image
function encodeImage(imagePath) {
  try {
    // Read the image file as a buffer
    const imageBuffer = fs.readFileSync(imagePath);

    // Encode the buffer to base64
    const base64String = base64.fromByteArray(imageBuffer);

    return base64String;
  } catch (error) {
    console.error('Error encoding image:', error.message);
    return null;
  }
}

const imageLocal = './ocrtest1.png';

const requestData = {
  messages: [
    {
      role: 'user',
      content: [
        { type: 'text', text: 'Return JSON document with data. Only return JSON not other text' },
        {
          type: 'image',
          image: { base64: encodeImage(imageLocal) }
        }
      ],
    }
  ],
  max_tokens: 500,
};

const apiKey = 'YOUR_OPENAI_API_KEY'; // Replace with your OpenAI API key

axios.post('https://api.openai.com/v1/chat/completions', requestData, {
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${apiKey}`,
  },
})
  .then(response => {
    const jsonString = response.data.choices[0].message.content;
    const jsonContent = JSON.parse(jsonString);

    const filenameWithoutExtension = path.basename(imageLocal, path.extname(imageLocal));
    const jsonFilename = `${filenameWithoutExtension}.json`;

    fs.writeFileSync(`./Data/${jsonFilename}`, JSON.stringify(jsonContent, null, 4));
    console.log(`JSON data saved to ${jsonFilename}`);
  })
  .catch(error => {
    console.error('Error:', error.message);
  });

// const axios = require('axios');
// const fs = require('fs');
// const path = require('path');

// const imageLocal = './ocrtest1.png';
// // const imageBase64 = encodeImage(imageLocal); // You can implement this function if needed
// const imageUrl = '';

// // Function to encode the image (you may need to implement this)
// // function encodeImage(imagePath) { /* Implement image encoding logic */ }

// const requestData = {
//   messages: [
//     {
//       role: 'user',
//       content: [
//         { type: 'text', text: 'Return JSON document with data. Only return JSON not other text' },
//         {
//           type: 'image',
//           image: { base64: encodeImage(imageLocal) }
//         }
//       ],
//     }
//   ],
//   max_tokens: 500,
// };

// axios.post('https://api.openai.com/v1/chat/completions', requestData, {
//   headers: {
//     'Content-Type': 'application/json',
//     'Authorization': 'Bearer YOUR_OPENAI_API_KEY', // Replace with your OpenAI API key
//   },
// })
//   .then(response => {
//     const jsonString = response.data.choices[0].message.content;
//     const jsonContent = JSON.parse(jsonString);

//     const filenameWithoutExtension = path.basename(new URL(imageUrl).pathname, path.extname(imageUrl));
//     const jsonFilename = `${filenameWithoutExtension}.json`;

//     fs.writeFileSync(`./Data/${jsonFilename}`, JSON.stringify(jsonContent, null, 4));
//     console.log(`JSON data saved to ${jsonFilename}`);
//   })
//   .catch(error => {
//     console.error('Error:', error.message);
//   });
