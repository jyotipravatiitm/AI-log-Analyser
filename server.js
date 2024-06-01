const express = require('express');
const Anthropic = require('@anthropic-ai/sdk');
const bodyParser = require('body-parser');

const app = express();
const anthropic = new Anthropic({ apiKey: process.env.API_KEY });
console.log(process.env.API_KEY); 

app.use(bodyParser.json());

app.post('/api/claude', async (req, res) => {
  try {
    const response = await anthropic.messages.create({
      model: 'claude-3-haiku-20240307',
      max_tokens: 2000,
      messages: [
        { role: 'user', content: req.body.prompt }
      ],
    });

    res.json(response);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

app.use(express.static('.'));

app.listen(3000, () => {
  console.log('Server running on port 3000');
});