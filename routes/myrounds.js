var router = require('express').Router();
var myRoundsCtrl = require('../controllers/myrounds');

// GET /mystudio
router.get('/', isLoggedIn, myRoundsCtrl.index);
router.get('/enter/:id', myRoundsCtrl.enter);
router.post('/engage', isLoggedIn, myRoundsCtrl.engage);


function isLoggedIn(req, res, next) {
  if ( req.isAuthenticated() ) return next();
  res.redirect('/auth/google');
}

module.exports = router;