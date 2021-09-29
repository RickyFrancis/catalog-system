module.exports = function (req, res, next) {
  if (user.isAdmin) {
    next();
  }
  else {
    res.status(403).send('Forbidden');
  }
}