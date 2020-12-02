/*
* Project: Lucky Lows
* Module: Controller 
* Target: /settings
* Comment: functions for editing and updating user settings.
-----------------------------------------------*/
const User = require('../models/user');

module.exports = {
  index,

};

/*******************************
*
*
 *******************************/
function index( req, res, next )
{
 //console.log("----------------------------", req.user,"<-----REACH my rounds ");
 res.render("../views/settings");  
}