/*
* Project: Lucky Lows
* Module: Router
* Target: myStudio
* Comment: 
-----------------------------------------------*/
var router = require('express').Router();
var myStudioCtrl = require('../controllers/mystudio');

// GET /mystudio
router.get('/', isLoggedIn, myStudioCtrl.index);
router.get('/new', isLoggedIn, myStudioCtrl.new);
router.post('/studio', isLoggedIn, myStudioCtrl.make);
router.post('/launch', isLoggedIn, myStudioCtrl.create);

function isLoggedIn(req, res, next) {
  if ( req.isAuthenticated() ) return next();
  res.redirect('/auth/google');
}

module.exports = router;