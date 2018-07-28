var server_port = process.env.OPENSHIFT_NODEJS_PORT || 8080;
var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || 'localhost';

const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.get('/notes', function (req, res) {
  res.send([{title: 'himan', cost: '1000'}]);
});

app.listen(server_port, server_ip_address, function () {
  console.log( "Listening on " + server_ip_address + ", port " + server_port )
});
