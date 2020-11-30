
const Sys = require('../models/system');
const util = require('../controllers/utilities');

module.exports = {
  index,
  showRound,
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
        res.render("dashboard", {welcome, avatarUrl, id:"xxx",  VIPRounds});
    }

}

/*******************************
*
*
 *******************************/
function showRound( req, res, next )
{
   res.send( "R OOOOOOOOOOOOOO M");
}

// Just some fake testing data
 let   VIPRounds = [{
                    id: "5fc2f1e6876c4b27eb7c52ae",
                    title: "COLORS",
                    population: 1000,
                    CDT: util.getCDT( 145600900 ) 
                  },
                  {
                    id:"5fc32e45bdca5d30ed5799de",
                    title: "SHADES",
                    population: 45002,//round.population,
                    CDT: util.getCDT( 800000000 ) 
                  },
                  {
                    id:"5fc3ec7b36b7f700b5564a01",
                    title: "Black&White",
                    population: 4542,
                    CDT: util.getCDT( 650000 ) 
                  },
                  {
                    id:"5fc3f21bf487f8013c4d24bc",
                    title: "REDish",
                    population: 553,
                    CDT: util.getCDT( 999999999 ) 
                  },
                  ];