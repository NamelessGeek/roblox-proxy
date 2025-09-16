const express = require('express');
const fetch = require('node-fetch'); // v2
const app = express();

const PORT = process.env.PORT || 3000;
const API_KEY = process.env.PROXY_API_KEY || ''; // optional secret

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});

app.get('/', (req, res) => res.send('roblox-proxy running'));

app.get('/gamepasses/:userId', async (req, res) => {
  const key = req.get('x-api-key') || '';
  if (API_KEY && key !== API_KEY) return res.status(401).json({ error: 'Unauthorized' });

  const userId = req.params.userId;
  if (!/^\d+$/.test(userId)) return res.status(400).json({ error: 'Invalid userId' });

  try {
    const r = await fetch(`https://games.roblox.com/v1/users/${userId}/game-passes?limit=100`);
    if (!r.ok) return res.status(500).json({ error: 'Roblox API error', status: r.status });
    const body = await r.json();
    const passes = (body.data || []).map(gp => ({
      id: gp.id,
      name: gp.name,
      price: gp.price || 0
    }));
    return res.json(passes);
  } catch (err) {
    console.error('fetch error', err);
    return res.status(500).json({ error: 'Fetch failed' });
  }
});

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
