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
  req.query.order === 'desc' ? sortParams.order = req.query.sortBy : sortParams.order = 'asc';
  req.query.sortBy ? sortParams.sortBy = req.query.sortBy : sortParams.sortBy = 'date';

  const sortObject = {};
  sortObject[sortParams.sortBy] = sortObject.order;
  console.log(req.query.entryNumber);
  req.query.entryNumber ? searchParameter.entryNumber = req.query.entryNumber : {};
  req.query.author ? searchParameter.author = {
    $regex: req.query.author,
    $options: 'i'
  } : {};
  req.query.title ? searchParameter.title = {
    $regex: req.query.title,
    $options: 'i'
  } : {};
  req.query.date ? searchParameter.date = {
    $regex: req.query.date,
    $options: 'i'
  } : {};
  req.query.comments ? searchParameter.comments = {
    $regex: req.query.comments,
    $options: 'i'
  } : {};

  try {
    const count = await Entry.countDocuments({ ...searchParameter });
    const entries = await Entry.find({ ...searchParameter }).sort({ ...sortObject }).limit(pageSize).skip((pageNumber - 1) * pageSize);
    if (count < 1) {
      return res.status(404).send('Not found!');
    }
    res.status(200).send({
      entries: entries,
      page: pageNumber,
      pageSize: pageSize,
      total: count,
      pages: Math.ceil(count / pageSize)
    })
  } catch (error) {
    console.log(error);
    res.status(400).send({
      error: [
        {
          msg: error.message
        }
      ]
    });
  }
});


router.get('/:id', auth, async (req, res) => {
  const isValidObjectId = mongoDB.ObjectId.isValid(req.params.id);
  if (!isValidObjectId) {
    return res.status(400).send({
      error: [
        {
          msg: 'ObjectID is not valid'
        }
      ]
    });
  }
  try {
    const entry = await Entry.findById(req.params.id);
    if (!entry) {
      return res.status(404).send({
        error: [
          {
            msg: 'Not found'
          }
        ]
      });
    }
    res.status(200).send(entry);
  } catch (error) {
    res.status(400).send({
      error: [
        {
          msg: error.message
        }
      ]
    })
  }
})

router.post('/', auth, async (req, res) => {
  try {
    const result = validateEntry(req.body);
    if (result.error) return res.status(400).send({
      error: [
        {
          msg: result.error.details[0].message
        }
      ]
    });

    let entry = await Entry.findOne({ entryNumber: req.body.entryNumber });
    if (entry) return res.status(400).json({
      errors: [
        {
          msg: "Entry Number Already Exists"
        }
      ]
    });

    entry = new Entry(req.body);
    entry = await entry.save();
    res.status(200).send(entry);
  } catch (error) {
    console.log(error);
    res.status(400).json({
      error: [
        {
          msg: error.message
        }
      ]
    });
  }
});




module.exports = router;