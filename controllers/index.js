const Sys = require('../models/system');
const Round = require('../models/round');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const util = require('../controllers/utilities');
module.exports = {
  index,
  refreshData,
};


let importantRounds = [];

/*******************************
*
*
 *******************************/
function index(req, res)
{ // rounds will be passed to stickers.ejs
  // let VIPRounds = [];

   Sys.find({}).populate("VIPRounds").exec( (err, sys)=> {

      let vips = sys[0].VIPRounds;
      let timerStrings = [];
      vips.forEach(vip => {
        timerStrings.push( util.getCDT(vip.CDT));
       
      });
    
    //  console.log("VIP-->",timerStrings);
     res.render("index", {VIPRounds: sys[0].VIPRounds,timerStrings});
     });
   
 }

/*******************************
* Main process engin, will be called every minutes
* Duty: 1- find all active rooms, check and update their due
*       2- find Rounds that have been marked to be deactive
*       3- control and update counter of each Round, and re-run active ones
*       4- calculate winners and losers and set the rewards
 *******************************/
function refreshData()
{
  console.log(".");
}

