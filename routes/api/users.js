const auth = require('../../middlewares/auth');
const authAdmin = require('../../middlewares/authAdmin');
const { User, validateUser } = require('../../models/User');
const _ = require('lodash');
const bcrypt = require('bcryptjs');
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
    user = await user.save();
    let url = `${config.get('url')}?id=${user._id}&code=${user.verificationCode}`
    let isSuccessful = mailHandler(user.email, user.name, user.verificationCode, url);
    if (!isSuccessful) throw new Error('Something went wrong');
    else if (isSuccessful) {
      res.status(200).send(_.pick(user, ['_id', 'name', 'email']));
    }
  } catch (error) {
    console.error(error);
    res.status(400).send(error.message);
  }
});

router.post('/verify', async (req, res) => {
  try {
    let { id, code } = req.query;
    let user = await User.findById(id);
    if (!user) return res.status(400).send('User not found');
    if (Number(code) !== user.verificationCode || !user.verificationCode) {
      return res.status(200).send('Verification Failed');
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
})

module.exports = router;