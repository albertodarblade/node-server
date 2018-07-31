const express = require('express');
const app = express();


console.log(process.env.OPENSHIFT_NODEJS_IP || process.env.OPENSHIFT_INTERNAL_IP || 'localhost');
console.log(process.env.OPENSHIFT_NODEJS_PORT ||  process.env.OPENSHIFT_INTERNAL_PORT || process.env.PORT || 3000);

app.configure(function() {
  // Set the IP and port to use the OpenShift variables.
  app.set('port', process.env.OPENSHIFT_NODEJS_PORT ||  process.env.OPENSHIFT_INTERNAL_PORT || process.env.PORT || 3000);
  app.set('ip', process.env.OPENSHIFT_NODEJS_IP || process.env.OPENSHIFT_INTERNAL_IP || 'localhost');
});
// Set the app.listen to use the port and ip.
app.listen(app.get('port'), app.get('ip'), function(){
  console.log("Express server listening on " + app.get('ip') + ":" + app.get('port'));
});




/* 
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const bodyParser = require('body-parser')
//config variables.
var server_port = 8080;
var server_ip_address = 'localhost';
const connectionString = 'mongodb+srv://albertoblacutt:jasmin@hommybaby-uuylx.mongodb.net/test?retryWrites=true';

mongoose.connect(connectionString, {useNewUrlParser: true, auth:{authdb:"admin"} })
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
const notesRoutes = require('./app/routes/notes.route');

app.use('/note-books', noteBookRoutes);

app.listen(server_port, server_ip_address, function () {
  console.log( "Listening on " + server_ip_address + ", port " + server_port )
});
 */