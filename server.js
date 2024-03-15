const express = require('express');
const bodyParser = require('body-parser');
const { OpenAIAPI } = require('openai');

const app = express();
const port = 3000;

// Set your OpenAI API key (replace 'YOUR_API_KEY' with your actual key)
const apiKey = 'YOUR_API_KEY';
const openai = new OpenAIAPI({ key: apiKey });

app.use(bodyParser.json());

app.post('/api/openai', async (req, res) => {
    try {
        const { query } = req.body;

        // Call OpenAI API
        const response = await openai.complete({
            engine: 'text-davinci-002',
            prompt: query,
            max_tokens: 150,
        });

        res.json({ response: response.choices[0].text.trim() });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
