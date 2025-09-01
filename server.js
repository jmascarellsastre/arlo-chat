// Simple proxy server for Arlo (Node + Express)
// - Serves the frontend in /public
// - Provides POST /api/chat that calls OpenAI Responses API
// Usage:
//   npm install
//   cp .env.example .env   # put your OPENAI_API_KEY
//   npm run dev
require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors');
const { OpenAI } = require('openai');

const app = express();
const openaiKey = process.env.OPENAI_API_KEY || '';
const client = openaiKey ? new OpenAI({ apiKey: openaiKey }) : null;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.post('/api/chat', async (req, res) => {
  try {
    const messages = req.body.messages || [];
    if (!client) {
      // Fallback demo (no key)
      const last = messages[messages.length - 1]?.content || '';
      return res.json({ text: `Demo: Has dicho “${last}”. Cuando añadas tu clave OPENAI_API_KEY, responderé con IA.` });
    }
    const response = await client.responses.create({
      model: 'gpt-4o-mini',
      input: messages,
    });
    const text = response.output_text || '(sin texto)';
    res.json({ text });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: e.message || 'error' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Arlo server on http://localhost:${PORT}`);
});
