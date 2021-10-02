const auth = require('../../middlewares/auth');
const authAdmin = require('../../middlewares/authAdmin');
const { User, validateUser } = require('../../models/User');
const _ = require('lodash');
const bcrypt = require('bcryptjs');

const router = require('express').Router();


router.get('/me', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password -isAdmin');
    res.status(200).send(user);
  } catch (error) {
    console.log(error);
    res.status(400).json({
      errors: [
        {
          msg: error.message
        }
      ]
    })
  }
});


router.get('/', auth, authAdmin, async (req, res) => {
  try {
    const users = await User.find();
    if (!_.isEmpty(users)) return res.status(400).send('No User found');
    res.status(200).send(users);
  } catch (error) {
    console.log(error);
    res.status(400).json({
      errors: [
        {
          msg: error.message
        }
      ]
    });
  }
});


router.post('/', async (req, res) => {
  try {
    const result = validateUser(req.body);
    if (result.error) return res.status(400).json({
      errors: [
        {
          msg: result.error.details[0].message
        }
      ]
    });


    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).json({
      errors: [
        {
          msg: "User Already Exists"
        }
      ]
    });
    const salt = await bcrypt.genSalt(12);
    const password = await bcrypt.hash(req.body.password, salt);

    user = new User({
      name: req.body.name,
      email: req.body.email,
      password: password,
      isAdmin: req.body.isAdmin
    });
    await user.save();
    const token = user.generateAuthToken();
    res.status(200).header('x-auth-token', token).send(_.pick(user, ['_id', 'name', 'email']));
  } catch (error) {
    console.error(error);
    res.status(400).json({
      errors: [
        {
          msg: error.message
        }
      ]
    });
  }
});

module.exports = router;