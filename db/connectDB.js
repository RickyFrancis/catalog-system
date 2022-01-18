const mongoose = require('mongoose');

const mongoURI =
  process.env.MONGO_URI ||
  'mongodb://116.206.254.198:27017/catalog-system?readPreference=primary&appname=MongoDB%20Compass&ssl=false';
const connectDB = () => {
  mongoose
    .connect(mongoURI)
    .then(() => {
      console.log('connected');
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = connectDB;
