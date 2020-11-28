var router = require('express').Router();
var myRoundsCtrl = require('../controllers/myrounds');

// GET /myrounds
router.get('/myrounds', myRoundsCtrl.index);
router.get('/myrounds/new', myRoundsCtrl.new);
router.post('/myrounds/studio', myRoundsCtrl.make);
router.post('/myrounds/launch', myRoundsCtrl.create);

function isLoggedIn(req, res, next) {
  if ( req.isAuthenticated() ) return next();
  res.redirect('/auth/google');
}

module.exports = router;