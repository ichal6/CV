class Translate {
    constructor(tag, language) {
            this.attribute = tag;
            this.lng = language;
        }
        //translate 
    process() {
        const att = this.attribute
        const xrhFile = new XMLHttpRequest();
        let LngObject;
        //load content data 
        xrhFile.open("GET", "./assets/languages/" + this.lng + ".json", false);
        xrhFile.onreadystatechange = function () {
            if (xrhFile.readyState === 4) {
                if (xrhFile.status === 200 || xrhFile.status == 0) {
                    LngObject = JSON.parse(xrhFile.responseText);
                    const elements = document.querySelectorAll('[' + att + ']');
                    if (elements != null) {
                        elements.forEach(element => {
                            const key = element.getAttribute(att);
                            if (LngObject[key] != null)
                                element.innerHTML = LngObject[key];
                        });
                    }
                }
            }
        };
        xrhFile.send();
        return LngObject;
    }
}
