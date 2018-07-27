const express = require('express');
const app = express();

const cors = require('cors');

app.use(cors);
app.get('/notes', function (req, res) {
  res.send([{title: 'himan', cost: '1000'}]);
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
