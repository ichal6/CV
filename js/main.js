function load(currentLng, tag){
    const translate = new Translate();
    const attributeName = tag;
    translate.init(attributeName, currentLng);
    translate.process(); 
}

function lastSingleLetterToNewLine(el){
    let result;
    el.forEach((element, i)=>{
       if(!element.innerHTML.match(/[{}]|<script|^\n$/gi)){
        result = element.innerHTML.replace(/ (.) /gi, " "+'\$1'+"&nbsp;");
       }
       element.innerHTML = result;
    });
}

// Parse language parameter from URL (default to browser language if not specified)
const urlParams = new URLSearchParams(window.location.search);
const userLang = urlParams.get("lang") || navigator.language.slice(0, 2);

load(userLang, 'data-tag');

let el = document.querySelectorAll("h1, h2, h3, h4, h5, p, span, .text, .about-point");

lastSingleLetterToNewLine(el);
