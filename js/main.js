function load(currentLng, tag){
    const translate = new Translate();
    const attributeName = tag;
    translate.init(attributeName, currentLng);
    translate.process(); 
}

// Parse language parameter from URL (default to browser language if not specified)
const urlParams = new URLSearchParams(window.location.search);
const userLang = urlParams.get("lang") || navigator.language.slice(0, 2);

load(userLang, 'data-tag');
