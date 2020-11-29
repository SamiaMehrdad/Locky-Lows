module.exports = {
 getCDT,
 shortDate,
};

/*******************************
*
*
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
// Will display time in 10:30:23 format
 return( days + ':' + hours.substr(-2) + ':' + minutes.substr(-2)  );

}

/*******************************
*
*
 *******************************/
function shortDate( date )
{
    let d = date;//new Date( date );

    return d.toLocaleDateString();
    // return ((date.getMonth() > 8) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))
    //          + '/' + ((date.getDate() > 9) ? date.getDate() : ('0' + date.getDate()))
    //          + '/' + date.getFullYear() );
}