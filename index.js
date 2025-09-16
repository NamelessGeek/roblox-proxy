const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000; // Render will set the PORT automatically

// Allow Roblox Studio to access the API
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});

// Root route to check if server is running
app.get('/', (req, res) => res.send('roblox-proxy running'));

// Gamepasses route (dummy/test data)
app.get('/gamepasses/:userId', (req, res) => {
  const userId = req.params.userId;
  // Return fake gamepasses for testing
  const passes = [
    { id: 123456, name: "VIP Pass", price: 50 },
    { id: 234567, name: "Super Pass", price: 100 },
    { id: 345678, name: "Elite Pass", price: 200 }
  ];
  return res.json(passes);
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
