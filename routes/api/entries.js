const { Entry, validateEntry } = require('../../models/Entry');
const _ = require('lodash');
const auth = require('../../middlewares/auth');
const mongoDB = require('mongodb');
const router = require('express').Router();

router.get('/', auth, async (req, res) => {
  let pageSize = Number(req.query.pageSize) || 10;
  let pageNumber = Number(req.query.pageNumber) || 1;
  let searchParameter = {};
  let sortParams = {};
  req.query.order === 'desc'
    ? (sortParams.order = req.query.sortBy)
    : (sortParams.order = 'asc');
  req.query.sortBy
    ? (sortParams.sortBy = req.query.sortBy)
    : (sortParams.sortBy = 'date');

  const sortObject = {};
  sortObject[sortParams.sortBy] = sortObject.order;
  req.query.entryNumber
    ? (searchParameter.entryNumber = parseInt(req.query.entryNumber))
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

  try {
    const count = await Entry.countDocuments({ ...searchParameter });
    const entries = await Entry.find({ ...searchParameter })
      .sort({ ...sortObject })
      .limit(pageSize)
      .skip((pageNumber - 1) * pageSize);
    if (count < 1) {
      return res.status(404).send('Not found');
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
      return res.status(404).send('Not found');
    }
    res.status(200).send(entry);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.post('/', auth, async (req, res) => {
  req.body.date = new Date(req.body.date);
  try {
    const result = validateEntry(req.body);
    if (result.error)
      return res.status(400).send(result.error.details[0].message);

    let entry = await Entry.findOne({ entryNumber: req.body.entryNumber });
    if (entry) return res.status(400).send('Entry Number Already Exists');

    entry = new Entry(req.body);
    entry = await entry.save();
    res.status(200).send(entry);
  } catch (error) {
    console.log(error);
    res.status(400).send(error.message);
  }
});




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
