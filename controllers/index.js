

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
    res.render("index", {});
}

function refreshData()
{
   // console.clear();
    console.log(".");
}

