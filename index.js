const express = require('express');
const fetch = require('node-fetch');
const app = express();
const PORT = process.env.PORT || 10000;

const GAME_ID = YOUR_GAME_ID; // put your Roblox game's ID here

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});

app.get('/gamepasses/:userId', async (req, res) => {
  try {
    const response = await fetch(`https://games.roblox.com/v1/games/${GAME_ID}/game-passes?limit=100`);
    const data = await response.json();

    // Optionally filter passes for specific owner
    const userId = req.params.userId;
    const passes = (data.data || []).map(gp => ({
      id: gp.id,
      name: gp.name,
      price: gp.price || 0,
      ownerId: userId // mark who the owner is
    }));

    res.json(passes);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Fetch failed' });
  }
});

app.listen(PORT, () => console.log(`Proxy running on port ${PORT}`));
