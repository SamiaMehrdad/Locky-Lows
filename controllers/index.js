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
   let VIPRounds = [];

   Sys.find({}).select({ "VIPRounds": 1}).exec( (err, sys)=> {

      let vips = sys[0].VIPRounds;

      vips.forEach(vip => {

        Round.findById(vips[0] , (err, round)=>  {
        VIPRounds.push( {
                          id: vip,
                          title: round.title,
                          population: round.population,
                          CDT: util.getCDT( round.CDT ) 
                        });
        });
      });
    //  console.log("VIP-->",VIPRounds);
    });
// Just some fake testing data
    VIPRounds = [{
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
     res.render("index", {VIPRounds});
 }

function refreshData()
{
   // console.clear();
    console.log(".");
}

