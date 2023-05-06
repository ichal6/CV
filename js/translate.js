function Translate() { 
    //initialization
    this.init =  function(attribute, lng){
        this.attribute = attribute;
        this.lng = lng;    
    }
    //translate 
    this.process = function(){
                _self = this;
                const xrhFile = new XMLHttpRequest();
                //load content data 
                xrhFile.open("GET", "./assets/languages/"+this.lng+".json", false);
                xrhFile.onreadystatechange = function ()
                {
                    if(xrhFile.readyState === 4)
                    {
                        if(xrhFile.status === 200 || xrhFile.status == 0)
                        {
                            const LngObject = JSON.parse(xrhFile.responseText);
                            const elements = document.querySelectorAll('[' + _self.attribute + ']')
                            if(elements != null) {
                                elements.forEach(element => {
                                    const key = element.getAttribute(_self.attribute)
                                    if (LngObject[key] != null)
                                        element.innerHTML = LngObject[key];
                                });
                            }                         
                        }
                    }
                }
                xrhFile.send();
    }    
}
