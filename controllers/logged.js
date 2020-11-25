const User = require('../models/user');

module.exports = {
  index,
//  addFact,
//  delFact
};

function index( req, res, next )
{
    console.log("-----------------------------", req.user,"<-----REACH CTRL: type ", typeof(req.user));
    if(req.user.isNewbe)
        console.log("This one is new");
    res.render("logged");
}