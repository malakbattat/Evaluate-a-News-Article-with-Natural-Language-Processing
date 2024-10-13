const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cors = require('cors');
const fetch = require('node-fetch');

// Load environment variables from .env file
dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('dist'));

app.get('/', function (req, res) {
  res.sendFile(path.resolve('src/client/views/index.html'));
});

app.post('/api', async function (req, res) {
  const text = req.body.text;
  const apiKey = process.env.API_KEY;
  const url = `https://api.meaningcloud.com/sentiment-2.1?key=${apiKey}&lang=en&txt=${encodeURIComponent(text)}`;

  console.log('API Key:', apiKey);
  console.log('URL:', url);

  try {
    const response = await fetch(url);
    const data = await response.json();
    res.send(data);
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ message: 'Something went wrong with the API request.' });
  }
});




app.listen(8081, function () {
  console.log('Server running on port 8081');
});
