var router = require('express').Router();
var myStudioCtrl = require('../controllers/mystudio');

// GET /mystudio
router.get('/mystudio', isLoggedIn, myStudioCtrl.index);
router.get('/mystudio/new', isLoggedIn, myStudioCtrl.new);
router.post('/mystudio/studio', isLoggedIn, myStudioCtrl.make);
router.post('/mystudio/launch', isLoggedIn, myStudioCtrl.create);

function isLoggedIn(req, res, next) {
  if ( req.isAuthenticated() ) return next();
  res.redirect('/auth/google');
}

module.exports = router;