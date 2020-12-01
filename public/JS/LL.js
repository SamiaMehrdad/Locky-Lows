/* CLIENT SIDE for dashboard & main index

*/

/*--------------------- cache elements -----------------------------------*/
const stickerEls = document.querySelectorAll(".sticker");
// console.log(stickerEls);
/*--------------------- event listeners -----------------------------------*/

stickerEls.forEach(element => { 
    setEvent(element.id, "click", stickerClicked );
    console.log(element.id);

});

/**-------------------------------
 *  Event listener for stickers click
 *  
 *  *return: redirect to enter/roundId
 *-------------------------------*/
function stickerClicked(e)
{
    let selectedElem = getElemById(e.target.id);
    if(selectedElem) // check cus there is many small elements inside target
        if(selectedElem.id.length > 10 ) //and they may interfearing
        {
            window.location.href = "/myrounds/enter/"+selectedElem.id.substring(1);
        }
}

/**-------------------------------
 *  getElemById(id) Make life a little easier.
 *  Show useful console log on errors
 *  *return: DOM element
 *-------------------------------*/
function getElemById(id)
{
  let result = document.getElementById(id);
  if( !result )
    console.log(` DEBUG WARNING! #${id} element is undefined.`);
  return result;
}

/**-------------------------------
 *  setEvent(id , type, funcName) Make life a little easier.
 *  Set event handler for given id.
 *  Show useful console log on errors
 *  *return: true if succeed
 *-------------------------------*/
function setEvent(id , type, funcName)
{
  let elem = document.getElementById(id);
  if( !elem )
  {
    console.log(` DEBUG WARNING! Eventlistener for #${id} is undefined.`);
    return false;
  }
    elem.addEventListener( type , funcName );
    return true;
}
