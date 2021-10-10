const Joi = require('joi');
const mongoose = require('mongoose');

const entrySchema = new mongoose.Schema({
  entryNumber: {
    type: String,
    required: true
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
    default: Date.now
  },
  comments: {
    type: String,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users'
  },
  dateOfCreation: {
    type: Date,
    default: Date.now
  },
  updateTime: {
    type: Date,
    default: Date.now
  }
})

const Entry = mongoose.model('Entry', entrySchema);

const validateEntry = function (entry) {
  const schema = Joi.object({
    entryNumber: Joi.number().required(),
    title: Joi.string().required(),
    author: Joi.string().required(),
    date: Joi.date(),
    comments: Joi.string().empty('')
  });
  return schema.validate(entry);
}
module.exports = { Entry, validateEntry }