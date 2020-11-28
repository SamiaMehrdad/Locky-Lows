const User = require('../models/user');

module.exports = {
  index,
//  addFact,
//  delFact
};

function index( req, res, next )
{
  if(!req.user)
    {
      res.redirect("/");
      return;
    }
    let welcome = "";
    let userName = req.user.name.split(' ')[0];
    let avatarUrl = req.user.avatar;
    console.log("AVATAR:====>",avatarUrl,":", typeof(avatarUrl));
    // console.log("-----------------------------", req.user,"<-----REACH CTRL: type ", typeof(req.user));
    if(req.user.isNewbe)
    {
        req.user.isNewbe = false;
        req.user.save( err => {
            if(err)
                 res.redirect('/errorDB');
            welcome += "Good luck and have fun " + userName + '.';
            res.render("welcome", {welcome, avatar:avatarUrl }); 
          });
    }
    else
    {
        welcome = "Welcome back " + userName + '.';
        res.render("dashboard", {welcome, avatarUrl});
    }  
    
}