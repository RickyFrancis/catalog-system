const { Entry, validateEntry } = require('../../models/Entry');
const _ = require('lodash');
const auth = require('../../middlewares/auth');
const mongoDB = require('mongodb');
const router = require('express').Router();
const reqDebugger = require('debug')('app:requestDebugger');

router.get('/', auth, async (req, res) => {
  let pageSize = Number(req.query.pageSize) || 10;
  let pageNumber = Number(req.query.pageNumber) || 1;
  let searchParameter = {};
  let sortParams = {};
  req.query.order === 'asc'
    ? (sortParams.order = 1)
    : (sortParams.order = -1);
  req.query.sortBy
    ? (sortParams.sortBy = req.query.sortBy)
    : (sortParams.sortBy = 'updateTime');

  const sortObject = [sortParams.sortBy.toString(), sortParams.order];

  req.query.entryNumber
    ? (searchParameter.entryNumber = {
      $regex: '^' + req.query.entryNumber,
      $options: 'i',
    })
    : {};
  req.query.author
    ? (searchParameter.author = {
      $regex: req.query.author,
      $options: 'i',
    })
    : {};
  req.query.title
    ? (searchParameter.title = {
      $regex: req.query.title,
      $options: 'i',
    })
    : {};
  req.query.date
    ? (searchParameter.date = {
      $gte: new Date(req.query.date).setHours(00, 00, 00),
      $lt: new Date(req.query.date).setHours(11, 59, 59),
    })
    : {};
  req.query.comments
    ? (searchParameter.comments = {
      $regex: req.query.comments,
      $options: 'i',
    })
    : {};
  searchParameter.createdBy = req.user.id;

  try {
    const count = await Entry.countDocuments({ ...searchParameter });
    const entries = await Entry.find({ ...searchParameter })
      .sort([sortObject])
      .limit(pageSize)
      .skip((pageNumber - 1) * pageSize);
    if (count < 1) {
      return res.status(404).send('No entires found');
    }
    res.status(200).send({
      entries: entries,
      page: pageNumber,
      pageSize: pageSize,
      total: count,
      pages: Math.ceil(count / pageSize),
    });
  } catch (error) {
    console.log(error);
    res.status(400).send(error.message);
  }
});

router.get('/:id', auth, async (req, res) => {
  const isValidObjectId = mongoDB.ObjectId.isValid(req.params.id);
  if (!isValidObjectId) {
    return res.status(400).send('ObjectID is not valid');
  }
  try {
    const entry = await Entry.findById(req.params.id);
    if (!entry) {
      return res.status(404).send('No entries yet. Please add some.');
    }
    res.status(200).send(entry);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.post('/', auth, async (req, res) => {
  reqDebugger(req.body);
  req.body.date = new Date(req.body.date);
  const id = req.user.id;
  try {

    const result = validateEntry(req.body);
    if (result.error)
      return res.status(400).send(result.error.details[0].message);

    let entry = await Entry.findOne({ entryNumber: req.body.entryNumber, createdBy: id });
    if (entry) return res.status(400).send('Entry Number Already Exists');

    entry = new Entry(req.body);
    entry.createdBy = id;
    entry = await entry.save();
    res.status(200).send(entry);
  } catch (error) {
    console.log(error);
    res.status(400).send(error.message);
  }
});


router.put('/:id', auth, async (req, res) => {
  req.body.date = new Date(req.body.date);
  const isValidObjectId = mongoDB.ObjectId.isValid(req.params.id);
  if (!isValidObjectId) {
    return res.status(400).send('ObjectID is not valid');
  }
  try {
    reqDebugger(req.body);
    const result = validateEntry(req.body);
    if (result.error) {
      console.log(result.error)
      return res.status(400).send(result.error.details[0].message);
    }

    let entries = await Entry.findById(req.params.id);
    if (!entries) return res.status(200).send('Not found!');

    //let entryDoesExist = await Entry.find({ entryNumber: req.body.entryNumber });
    //if (entryDoesExist) return res.status(400).send('Entry Number Already exists. Please provide an unique number');
    req.body.updateTime = Date.now();
    entries = await Entry.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).send(entries);
  } catch (error) {
    console.log(error);
    if (error.code === 11000) return res.status(400).send('Entry Number already exists.');
    res.status(400).send(error.message);
  }

})

router.delete('/:id', auth, async (req, res) => {
  try {
    const isValidObjectId = mongoDB.ObjectId.isValid(req.params.id);
    if (!isValidObjectId) {
      return res.status(400).send('ObjectID is not valid');
    }
    await Entry.findByIdAndDelete(req.params.id);
    res.status(200).send('Deletion Successful');
  } catch (error) {
    console.log(error);
    res.status(400).send(error.message);
  }
});

module.exports = router;
