//Imports
require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const cors = require('cors')
const app = express();
const path = require('path');

const connectDB = require('./db/connectDB');



//Connect to Database
connectDB();


//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());




//routes
// app.get('/', (req, res) => {
//   console.log('server is up and running');
//   res.send('Server is up and running');
// });
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/entries', require('./routes/api/entries'));

// Set static folder
app.use(express.static('client/build'));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
});


//Listen to Port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => { console.log(`Listening to PORT: ${PORT}`) });