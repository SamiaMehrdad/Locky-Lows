var router = require('express').Router();
var settingsCtrl = require('../controllers/settings');

// GET /mystudio
router.get('/', settingsCtrl.index);


function isLoggedIn(req, res, next) {
  if ( req.isAuthenticated() ) return next();
  res.redirect('/auth/google');
}

module.exports = router;