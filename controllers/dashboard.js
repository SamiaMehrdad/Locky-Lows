
module.exports = {
  index,
};

/*******************************
*
*
 *******************************/
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
    // console.log("AVATAR:====>",avatarUrl,":", typeof(avatarUrl));
    if(req.user.isNewbe)
    {
        req.user.isNewbe = false;
        req.user.save( err => {
            if(err)
                 res.redirect('/errorDB');
            welcome += "Good luck and have fun " + userName + '.';
            res.render("welcome", {welcome}); 
          });
    }
    else
    {
        welcome = "Welcome back " + userName + '.';
        res.render("dashboard", {welcome, avatarUrl});
    }
    
}

