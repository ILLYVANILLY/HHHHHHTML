const express = require('express');
const axios = require('axios');

const app = express();
const PORT = 3000;

// Middleware to enable CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // Replace * with your actual domain
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// Proxy endpoint
app.get('/proxy', async (req, res) => {
  try {
    const { url } = req.query;
    if (!url) {
      return res.status(400).send('Missing URL parameter');
    }

    const response = await axios.get(url);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Proxy server is running on port ${PORT}`);
});
