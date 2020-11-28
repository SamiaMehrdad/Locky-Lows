

//BUG: each subject should be touched first,
// otherwise it's color will be set to prev color picker!!
//BUG related: selcted elemnt is undefined

/*--------------------- cache elements -----------------------------------*/
const studioSubjects = document.querySelectorAll(".make-subject-main");
const setPropPanelEl = getElemById("set-prop");
const setPropTitleEl = getElemById("set-prop-title");
const subjectTextEl = getElemById("subject-text");
const subjectsBackEl = getElemById("subject-color");
const subjectsColorEl = getElemById("subject-tcolor");
const launchBtn = getElemById("launch-btn");
const roundTitle = getElemById("round-title").innerText.split(' ')[0];
const roundTotalItems = studioSubjects.length;
/*------------------------ consts -----------------------------------------*/
const defColor = "#ff0000";
const defBackColor = "#647896";
/*---------------------- global variables ---------------------------------*/
let selectedElem = "";

let allSubjModels = [];
/*--------------------- event listeners -----------------------------------*/
setEvent("subject-text", "change", updateSubject );
setEvent("subject-color", "change", updateSubject );
setEvent("subject-tcolor", "change", updateSubject );
setEvent("prop-close", "click", propClose );
setEvent("launch-btn", "click", submit );
studioSubjects.forEach(element => { 
    setEvent(element.id, "click", subjectClicked );
    //console.log(element.innerText);
});


/*----------------------------initialize -------------------------------- */
makeModel();
propClose(); 

/*---------------------------- functions -------------------------------- */

/**-----------------------------
*
*
*---------------------------- */
function makeModel()
{
studioSubjects.forEach(element => {
allSubjModels.push(
  {
      text: element.innerText,
      backColor: defBackColor,
      textColor: defColor

  });
 });

 console.log(allSubjModels," ***ALL models in init");
}

/**-----------------------------
*
*
*---------------------------- */
function submit()
{
  //alert("POST");
  let payload = {
  title: roundTitle,
  fee: getElemById("fee").value,
  desc: getElemById("desc").value,
  counter:getElemById("counter").value,
  subjects: allSubjModels
  };
  post( "./launch", payload);
}
/**-----------------------------
*
*
*---------------------------- */
function propClose()
{
  setPropPanelEl.classList.add("hidden");
  studioSubjects.forEach(element => {
    element.classList.add("targeted")
  });
  // prevElem.classList.remove("targeted"); 
}


/**-----------------------------
*
*
*---------------------------- */
function subjectClicked(e)
{
  selectedElem = getElemById(e.target.id);
 // console.log(selectedElem, "SELECTED");
  setPropPanelEl.classList.remove("hidden");

  studioSubjects.forEach(element => 
    {
      element.classList.remove("targeted")
    });
   selectedElem.classList.add("targeted");
   let index = selectedElem.parentNode.innerText.split(')')[0] ;
   setPropTitleEl.innerText = "Subject No."+ index;
   index = parseInt(index)-1;
   subjectTextEl.value = allSubjModels[ index ].text;
   //console.log(e.target.style.backgroundColor, typeof(e.target.style.backgroundColor));
    // console.log(allSubjModels[index].backColor,"<==== backColor");
   subjectsBackEl.value = allSubjModels[index].backColor;
   subjectsColorEl.value = allSubjModels[index].textColor;
}

/**-----------------------------
*
*
*---------------------------- */
function updateSubject()
{
    
    let index = parseInt( selectedElem.parentNode.innerText.split(')')[0])-1 ;
    console.log("something changed for #", index); 
    console.log("CHANGE ELEM : ", allSubjModels[ index ]);
    allSubjModels[ index ].text = subjectTextEl.value;
    allSubjModels[ index ].textColor = subjectsColorEl.value;
    allSubjModels[ index ].backColor = subjectsBackEl.value;

    selectedElem.lastChild.textContent = allSubjModels[ index ].text; // innerText destroys formatting
    selectedElem.style.backgroundColor = allSubjModels[ index ].backColor;
    selectedElem.style.color = allSubjModels[ index ].textColor;
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
/**-------------------------------
 *  initEvents() Just a wrapper to help code looks cleaner
 *  This function also is using setEvent() to looks more clean.
 *  * Return : none
 *-------------------------------*/
function initEvents()
{
  setEvent("helpLabel", "click", showHelp );
  setEvent("levelName", "mouseenter",showResetLevel);
  setEvent("levelName", "mouseleave",()=> g.renderLevelLables() );
  setEvent("levelName", "click",initLevel);
  setEvent("btAgain", "click",btAgainClicked);
  setEvent("btNext", "click",btNextClicked);
  setEvent("btClose", "click", btCloseHelpClicked );
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
* Function to convert rgb color to hex format
*
*---------------------------- */
function rgb2hex(rgb) {
 rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
 return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
}

function hex(x) {
  const hexDigits = ["0","1","2","3","4","5","6","7","8","9","a","b","c","d","e","f"]; 
  return isNaN(x) ? "00" : hexDigits[(x - x % 16) / 16] + hexDigits[x % 16];
 }