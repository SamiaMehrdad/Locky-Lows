var router = require('express').Router();
var myRoundsCtrl = require('../controllers/myrounds');

// GET /mystudio
router.get('/myrounds', isLoggedIn, myRoundsCtrl.index);
router.get('/myrounds/enter', isLoggedIn, myRoundsCtrl.enter);
router.post('/myrounds/engage', isLoggedIn, myRoundsCtrl.engage);


function isLoggedIn(req, res, next) {
  if ( req.isAuthenticated() ) return next();
  res.redirect('/auth/google');
}

module.exports = router;