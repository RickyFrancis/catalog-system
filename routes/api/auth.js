const Joi = require('joi');
const _ = require('lodash');
const bcrypt = require('bcryptjs');
const { User } = require('../../models/User');
const router = require('express').Router();


router.post('/', async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    let user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send('Invalid email or password');

    const isValidPassword = await bcrypt.compare(req.body.password, user.password);
    if (!isValidPassword) return res.status(400).send('Invalid email or password');

    if (!user.isVerified) return res.status(400).send('User Not Verified');

    const token = user.generateAuthToken();
    res.status(200).send({ token, user: _.pick(user, ['_id', 'name', 'email']) });
  } catch (error) {
    console.error(error);
    res.status(400).send(error.message);
  }

});



function validate(user) {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
  });
  return schema.validate(user);
}


module.exports = router;