var router = require('express').Router();
var roomsCtrl = require('../controllers/rooms');

// GET /mystudio
router.get('/', myRoundsCtrl.index);
router.get('/enter', myRoundsCtrl.enter);
router.post('/engage', myRoundsCtrl.engage);