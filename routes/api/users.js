const auth = require('../../middlewares/auth');
const authAdmin = require('../../middlewares/authAdmin');
const { User, validateUser } = require('../../models/User');
const _ = require('lodash');
const bcrypt = require('bcryptjs');
const mongoDB = require('mongodb');
const mailHandler = require('../../controller/mailHandler');
const config = require('config');

const router = require('express').Router();


router.get('/me', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password -isAdmin');
    res.status(200).send(user);
  } catch (error) {
    console.log(error);
    res.status(400).send(error.message)
  }
});


router.get('/', auth, authAdmin, async (req, res) => {
  try {
    const users = await User.find({}).select('-password');

    if (_.isEmpty(users)) return res.status(400).send('No User found');

    res.status(200).send(users);
  } catch (error) {
    console.log(error);
    res.status(400).send(error.message);
  }
});


router.post('/', async (req, res) => {
  try {
    const result = validateUser(req.body);
    if (result.error) return res.status(400).send(result.error.details[0].message);


    let user = await User.findOne({ email: req.body.email });

    if (user) return res.status(400).send("User Already Exists");

    const salt = await bcrypt.genSalt(12);
    const password = await bcrypt.hash(req.body.password, salt);

    user = new User({
      name: req.body.name,
      email: req.body.email,
      password: password,
      isAdmin: req.body.isAdmin
    });
    let isSuccessful = mailHandler(user.email, user.name, user.verificationCode, user._id);
    if (!isSuccessful) throw new Error('Something went wrong');
    else if (isSuccessful) {
      user = await user.save();
      res.status(200).send({ user: _.pick(user, ['_id', 'name', 'email']) });
    }
  } catch (error) {
    console.error('[USER REGISTRATION]', error);
    res.status(400).send(error.message);
  }
});

router.post('/verify/:id/:verificationCode', async (req, res) => {
  try {
    let { id, verificationCode } = req.params;
    const isValidObjectId = mongoDB.ObjectId.isValid(id);

    if (!isValidObjectId) {
      return res.status(400).send('ObjectID is not valid');
    }

    let user = await User.findById(id);

    if (!user) return res.status(400).send('User not found');

    if (Number(verificationCode) !== user.verificationCode || !user.verificationCode) {
      return res.status(400).send('Verification Failed');
    }

    user.isVerified = true;
    user.verificationCode = null;
    await user.save();
    const token = user.generateAuthToken();
    res.status(200).send({ token, user: _.pick(user, ['_id', 'name', 'email']) });
  } catch (error) {
    console.log(error);
    res.status(400).send(error.message);
  }
});

router.post('/resend-code/:id', async (req, res) => {
  const id = req.params.id;
  try {
    let user = await User.findById(id);
    if (user.isVerified || user.verificationCode === null) {
      console.log('[RESEND CODE][VERIFICATION] Resend Attempt Failed.')
      return res.status(400).send('Resend Attempt Failed.');
    }
    user.verificationCode = user.generateVerificationCode();
    let isSuccessful = mailHandler(user.email, user.name, user.verificationCode, user._id);
    if (isSuccessful) {
      user = await user.save();
      res.status(200).send('Mail sent');
    }
  } catch (error) {
    console.log('[RESEND CODE]', error);
    res.status(400).send(error.message);
  }
})

module.exports = router;