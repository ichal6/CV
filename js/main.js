function load(currentLng, tag){
    const translate = new Translate();
    const attributeName = tag;
    translate.init(attributeName, currentLng);
    return translate.process(); 
}

function lastSingleLetterToNewLine(elements){
    let result;
    elements.forEach((element, i)=>{
       if(!element.innerHTML.match(/[{}]|<script|^\n$/gi)){
        result = element.innerHTML.replace(/ (.) /gi, " "+'\$1'+"&nbsp;");
       }
       element.innerHTML = result;
    });
}

// Parse language parameter from URL (default to browser language if not specified)
const urlParams = new URLSearchParams(window.location.search);
const userLang = urlParams.get("lang") || navigator.language.slice(0, 2);
const editModeEnabled = urlParams.has("edit") && urlParams.get("edit") == "yes";

const langDict = load(userLang, 'data-tag');

if(editModeEnabled)
    new EditMode(langDict, userLang);

let elements = document.querySelectorAll("h1, h2, h3, h4, h5, p, span, .text, .about-point");

lastSingleLetterToNewLine(elements);
