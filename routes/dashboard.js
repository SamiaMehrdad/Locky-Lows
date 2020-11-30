var router = require('express').Router();
var dashboardCtrl = require('../controllers/dashboard');

// GET /dashboard
router.get('/dashboard', dashboardCtrl.index);
router.get('/dashboard:id', dashboardCtrl.showRound);
// POST /facts
// We will already have access to the logged in user on
// the server, therefore do not use: /students/:id/facts

//router.post('/facts', isLoggedIn, studentsCtrl.addFact);

// DELETE /facts/:id

//router.delete('/facts/:id', isLoggedIn, studentsCtrl.delFact);

function isLoggedIn(req, res, next) {
  if ( req.isAuthenticated() ) return next();
  res.redirect('/auth/google');
}

module.exports = router;