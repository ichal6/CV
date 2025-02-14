class EditMode {
    langDictionary;
    #currentURL;
    #currentObject;
    #inputField;
    #actualDataTag;
    #userLang;
    #minimalizeEdit;

    constructor(langDictionary, userLang, translate) {
        this.#initializeEditMode();
        this.handleClick = this.handleClick.bind(this);
        this.saveChanges = this.saveChanges.bind(this);
        this.readJson = this.readJson.bind(this);
        this.langDictionary = langDictionary;
        this.#userLang = userLang;
        this.translate = translate;
        this.#minimalizeEdit = false
    }
   
    #initializeEditMode() {
        fetch('edit.html')
            .then(response => response.text())
            .then(data => {
                document.getElementById('edit-content').innerHTML = data;
                this.#toggleEditMode();
                
                const saveBtn = document.getElementById('save-btn');
                saveBtn.addEventListener("click", this.saveChanges);
                
                this.#inputField  = document.getElementById('input-field');

                this.#addBehaviorToInput();
                this.#addBehaviorToSave();
                this.#addBehaviorToMinimalizeEdit();
                this.#addBehaviorToClose();
            })
            .catch(error => console.error('Error loading edit mode:', error));
    }

    #addBehaviorToClose() {
        const closeEdit = document.getElementById('close');
        closeEdit.addEventListener('click', () => {
            if (confirm('Returning to edit mode requires refreshing the browser. Do you want to proceed?')) {
                document.getElementById('edit-menu').style.display = 'none';
            }
        });
    }

    #addBehaviorToMinimalizeEdit() {
        const minimalizeEdit = document.getElementById('minimalize');
        const editMenuContent = document.getElementById('edit-menu-content');
        minimalizeEdit.addEventListener('click', () => {
            editMenuContent.style.display = this.#minimalizeEdit ? 'flex' : 'none';
            minimalizeEdit.value = this.#minimalizeEdit ? '-' : '+';
            this.#minimalizeEdit = !this.#minimalizeEdit;
        });
    }

    #addBehaviorToSave() {
        document.getElementById('load-input').addEventListener('change', this.readJson);
    }

    readJson(event) {
        const file = event.target.files[0];
        if (!file) 
            return;

        const reader = new FileReader();

        reader.onload = (event) => {
            const contents = event.target.result;
            this.langDictionary = JSON.parse(contents);
            this.translate.assignData(this.langDictionary);
        };

        reader.readAsText(file);
    }

    #addBehaviorToInput() {
        // Adjust the width of the input field as the user types
        this.#inputField.addEventListener('input', () => {
            this.#adjustInputWidth(this.#inputField);
        });

        const saveFunction = () => {
            this.#currentObject.innerHTML = this.#inputField.value;
            
            lastSingleLetterToNewLine([this.#currentObject]);

            this.langDictionary[this.#actualDataTag] = this.#inputField.value;

            this.#inputField.style.display = 'none';
        }

        this.#inputField.onblur = saveFunction;

        this.#inputField.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                saveFunction();
            }
        });
    }

    #toggleEditMode() {
        const editOptions = document.getElementById('edit-options');

        const table = document.getElementById('content-table');
        const selectButton = document.getElementById('select-btn');
    
        let editEnabled = false;
    
        selectButton.addEventListener('click', () => {
            editEnabled = !editEnabled;
            selectButton.textContent = editEnabled ? 'Disable edit mode' : 'Enable edit mode';
            if(editEnabled){
                table.addEventListener('click', this.handleClick);
                editOptions.style.display = 'flex';
            }
            else {
                table.removeEventListener('click', this.handleClick);
                editOptions.style.display = 'none';
            }
        });
    }

    #calculatePositionInputField() {
        // Get the position
        const rect = this.#currentObject.getBoundingClientRect();
    
        // Position the input field directly below the clicked element
        this.#inputField.style.left = `${rect.left}px`;
        this.#inputField.style.top = `${rect.bottom + window.scrollY}px`; // Account for page scroll
    }
    
    //  to adjust input field width based on text length
    #adjustInputWidth(inputField) {
        // Create a temporary span to measure the width of the text
        const span = document.createElement('span');
        span.style.visibility = 'hidden';
        span.style.whiteSpace = 'nowrap'; // Prevent text wrapping
        span.textContent = inputField.value; // Set the text content to the input value
        document.body.appendChild(span);
    
        // Set the input width based on the span's width
        inputField.style.width = `${span.offsetWidth}px`; // Add a little padding
    
        // Remove the temporary span after measuring
        document.body.removeChild(span);
    }

    handleClick(event) {
        this.#actualDataTag = event.target.getAttribute('data-tag');

        if (!this.#actualDataTag)
            return;

        this.#currentObject = event.target;
        
        this.#inputField.value = this.langDictionary[this.#actualDataTag];
        this.#inputField.style.display = 'block';

        this.#calculatePositionInputField();
        
        this.#inputField.focus();
    
        this.#adjustInputWidth(this.#inputField);
    };
    
    saveChanges() {
        if (this.#currentURL)
            URL.revokeObjectURL(this.#currentURL);

        const blob = new Blob([JSON.stringify(this.langDictionary, null, 2)], { type: "application/json" });    
        this.#currentURL = URL.createObjectURL(blob);
        
        const link = document.getElementById("save-btn-link");
        link.href = this.#currentURL; 
        link.download = this.#userLang + ".json";
    };
}
