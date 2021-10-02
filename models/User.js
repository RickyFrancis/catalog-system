const Joi = require('joi');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const config = require('config');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 20
  },
  email: {
    type: String,
    required: true,
    unique: true,
    maxlength: 40,
    minlength: 5
  },
  password: {
    type: String,
    required: true
  },
  isAdmin: {
    type: Boolean,
    default: false,
    required: true
  },
});
userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ id: this._id, isAdmin: this.isAdmin }, config.get('jwtPrivateKey'));
  return token;
}

const User = mongoose.model('User', userSchema);



const validateUser = function (user) {
  const schema = Joi.object({
    name: Joi.string().required().min(3).max(20),
    email: Joi.string().email().min(5).max(40).required(),
    password: Joi.string().required().min(6),
    isAdmin: Joi.boolean()
  });

  return schema.validate(user);
}

module.exports = { User, validateUser };




