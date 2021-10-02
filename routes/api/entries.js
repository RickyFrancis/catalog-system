const { Entry, validateEntry } = require('../../models/Entry');
const _ = require('lodash');
const auth = require('../../middlewares/auth');

const router = require('express').Router();


router.get('/', auth, async (req, res) => {
  let pageSize = req.params.pageSize || 10;
  let pageNumber = req.params.pageNumber || 1
  let searchParameter = {};
  let sortParams = {};
  req.params.order === 'desc' ? sortParams.order = req.params.sortBy : sortParams.order = 'asc';
  req.params.sortBy ? sortParams.sortBy = req.params.sortBy : sortParams.sortBy = 'date';

  const sortObject = {};
  sortObject[sortParams.sortBy] = sortObject.order;

  req.params.entryNumber ? searchParameter.entryNumber = {
    $regex: req.query.entryNumber,
    $option: 'i'
  } : {};
  req.params.author ? searchParameter.author = {
    $regex: req.query.author,
    $option: 'i'
  } : {};
  req.params.title ? searchParameter.title = {
    $regex: req.query.title,
    $option: 'i'
  } : {};
  req.params.date ? searchParameter.date = {
    $regex: req.query.date,
    $option: 'i'
  } : {};
  req.params.comments ? searchParameter.comments = {
    $regex: req.query.comments,
    $option: 'i'
  } : {};

  try {
    const count = await Entry.countDocuments({ ...searchParameter });
    const entries = await Entry.find({ ...searchParameter }).sort({ ...sortObject }).limit(pageSize).skip((pageNumber - 1) * pageSize);
    if (count < 1) {
      res.status(404).send('Not found!');
    }
    res.status(200).json({
      entries: entries,
      page: pageNumber,
      pageSize: pageSize,
      total: count,
      pages: Math.ceil(count / pageSize)
    })
  } catch (error) {
    console.log(error);
    res.send(400).json({
      error: [
        {
          msg: error.message
        }
      ]
    });
  }
});


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