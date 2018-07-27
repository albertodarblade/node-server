const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.get('/notes', function (req, res) {
  res.send([{title: 'himan', cost: '1000'}]);
});

app.listen(3000, function () {
  console.log('Localhost port 3000');
});
