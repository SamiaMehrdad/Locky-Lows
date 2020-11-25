const User = require('../models/user');

module.exports = {
  index,
//  addFact,
//  delFact
};

function index( req, res, next )
{
    console.log("REACH CTRL ***************");
    res.render("logged");
}