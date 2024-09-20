const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

app.post('/api/predict', async (req, res) => {
  try {
    const { features } = req.body;
    const response = await axios.post('http://localhost:5001/predict', { features });
    res.json({ prediction: response.data.prediction });
  } catch (error) {
    res.status(500).json({ error: 'Error in prediction' });
  }
});

app.listen(port, () => {
  console.log(`Node.js server running on port ${port}`);
});
