class Translate {
    constructor(tag, language) {
        this.attribute = tag;
        this.lng = language;
    }

    process() {
        const att = this.attribute
        const xrhFile = new XMLHttpRequest();
        let LngObject;
        //load content data 
        xrhFile.translate = this.assignData;
        xrhFile.open("GET", "./assets/languages/" + this.lng + ".json", false);
        xrhFile.onreadystatechange = function () {
            this.attribute = att;
            if (xrhFile.readyState === 4) {
                if (xrhFile.status === 200 || xrhFile.status == 0) {
                    LngObject = this.translate(JSON.parse(xrhFile.responseText));
                }
            }
        };
        xrhFile.send();
        return LngObject;
    }

    assignData(jsonObj) {
        const LngObject = jsonObj;
        const elements = document.querySelectorAll('[' + this.attribute + ']');
        if (elements != null) {
            elements.forEach(element => {
                const key = element.getAttribute(this.attribute);
                if (LngObject[key] != null)
                    element.innerHTML = LngObject[key];
            });
        }
        return LngObject;
    }
}
