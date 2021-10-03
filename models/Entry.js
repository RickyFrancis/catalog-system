const Joi = require('joi');
const mongoose = require('mongoose');

const entrySchema = new mongoose.Schema({
  entryNumber: {
    type: Number,
    required: true,
    unique: true
  },
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true,
    default: new Date(Date.now())
  },
  comments: {
    type: String,
  }
})

const Entry = mongoose.model('Entry', entrySchema);

const validateEntry = function (entry) {
  const schema = Joi.object({
    entryNumber: Joi.number().required(),
    title: Joi.string().required(),
    author: Joi.string().required(),
    date: Joi.date(),
    comments: Joi.string()
  });
  return schema.validate(entry);
}
module.exports = { Entry, validateEntry }