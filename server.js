//Imports
const express = require('express');
const app = express();

const connectDB = require('./db/connectDB');


//Connect to Database
connectDB();


//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//routes
app.get('/', (req, res) => {
  console.log('server is up and running');
  res.send('Server is up and running');
});

//Listen to Port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => { console.log(`Listening to PORT: ${PORT}`) });