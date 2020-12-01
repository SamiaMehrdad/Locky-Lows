/* CLIENT SIDE for dashboard & main index

*/

/*--------------------- cache elements -----------------------------------*/
const roomSubjects = document.querySelectorAll(".make-subject-main");
const lockingPanelEl = getElemById("set-prop");
const lockBtnEl = getElemById("lock-btn");
/*---------------------- global variables ---------------------------------*/
const user =  getElemById("left-panel").getAttribute("data");
const round =  getElemById("canvas").getAttribute("data");
let selected = null;
/*--------------------- event listeners -----------------------------------*/

roomSubjects.forEach(element => { 
    setEvent(element.id, "click", subjectClicked );
   // console.log(element.id);

});
setEvent( "lock-btn" , "click", lockAndLeave );

/**-------------------------------
 *  Event listener for subjects click
 *  
 *  *return: none
 *-------------------------------*/
function subjectClicked(e)
{
    let selectedElem = getElemById(e.target.id);
    
    roomSubjects.forEach(element => {
        element.classList.remove("selected");
    });

    if(user)
        lockBtnEl.classList.remove('hidden');
    selectedElem.classList.add("selected");
    selected = selectedElem.getAttribute("data");
   // console.log( "Select ", selected , "USER:", user._id );
}

/**-------------------------------
 *  Event listener for Lock & Leave btn click
 *  
 *  *return: POST and redirect to myrounds/engage
 *-------------------------------*/
function lockAndLeave()
{
    let payload = {sId: selected ,round , user};
     console.log("POSTING-->", payload, " TO /engage");
    post( "../engage", payload ); // it should be ../
    window.location.href = '/myrounds'; 
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

/**-----------------------------
*
*
*---------------------------- */
function post( url, data )
{
  var xhr = new XMLHttpRequest();
  xhr.open("POST", url, true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.send(JSON.stringify(data));
}