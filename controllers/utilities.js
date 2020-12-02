/*
* Project: Lucky Lows
* Module: Controller 
* Target: -
* Comment: helper functions 
-----------------------------------------------*/
module.exports = {
 getCDT,
 shortDate,
};

/*******************************
* convert time (milisconds) to suitable text DD-HH:MM
* paaram: Number
* return: String
 *******************************/
function getCDT(milis) 
{
 let date = new Date(milis);
 let days = Math.floor(milis/(24*60*60*1000));
// Hours part from the timestamp
 var hours = "0" + date.getHours();
// Minutes part from the timestamp
 var minutes = "0" + date.getMinutes();
// Seconds part from the timestamp
 var seconds = "0" + date.getSeconds();
// Will display time in 10-30:23 format
 return( days + ' - ' + hours.substr(-2) + ' : ' + minutes.substr(-2)  );
}

/*******************************
* short and sweet
* reserving space for furture functionalities
 *******************************/
function shortDate( date )
{
    let d = date;//new Date( date );
    return d.toLocaleDateString();
}

/*******************************
* Check if user is engaged in this round or not
* param: Round id
* return: Boolean
 *******************************/
function alreadyTouched( roundId )
{

}