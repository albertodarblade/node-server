
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const bodyParser = require('body-parser')
const http = require('http');
//config variables.
var server_port = 8080;
var server_ip_address = '0.0.0.0';
const connectionString = 'mongodb+srv://albertoblacutt:jasmin@hommybaby-uuylx.mongodb.net/test?retryWrites=true';

mongoose.connect(connectionString, {useNewUrlParser : true, auth:{authdb:"admin"} })
.then(function () {
  console.log('connected to atlas db');
})
.catch(err => {
  console.log('connection error ', err);
});
app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
//routes
const noteBookRoutes = require('./app/routes/note-book.route');
const userRoutes = require('./app/routes/user.route')
const archiveRoutes = require('./app/routes/archive.route');

app.use('/note-books', noteBookRoutes);
app.use('/users', userRoutes);
app.use('/archives', archiveRoutes);

app.use('/', (req, res) => {
  res.send('nice job is working well heroku thanks');
});
/* TODO:Delete app.listen(server_port, server_ip_address, function () {
  console.log( "Listening on " + server_ip_address + ", port " + server_port )
});
 */
const port = process.env.PORT || '3500';
app.set('port', port);
const server = http.createServer(app);

server.listen(port, () => console.log(`API running on localhost:${port}`));