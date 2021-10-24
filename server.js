const express = require('express');
const path = require('path');

const app = express();
const Port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(Port, () => {
  console.log(`Successfully running on port ${Port}`);
});
