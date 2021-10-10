require('dotenv').config();
var express = require('express');
var app = express();
const path = require('path');

const connectDB = require('./db/connectDB');

//Connect to Database
connectDB();

//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/entries', require('./routes/api/entries'));

process.env.NODE_ENV = 'production';

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

app.set('port', process.env.PORT || 5000);
app.use(express.static(__dirname + '/public'));

// app.get('/', function(request, response) {
//   response.send('Hello World!')
// })

app.listen(app.get('port'), function () {
  console.log('Node app is running at localhost:' + app.get('port'));
});
