const mongoose = require('mongoose');

const mongoURI = process.env.MONGO_URI || 'mongodb://localhost/catalog-system';
console.log(mongoURI)
const connectDB = () => {
  mongoose.connect(mongoURI).then(() => { console.log('connected') }).catch((err) => { console.log(err) });
}

module.exports = connectDB;