class EditMode {
    constructor() {
        this.initializeEditMode();
        this.handleClick = this.handleClick.bind(this); // Bind the method
    }
   
    initializeEditMode() {
        fetch('edit.html')
            .then(response => response.text())
            .then(data => {
                document.getElementById('edit-content').innerHTML = data;
                this.toggleEditMode();
            })
            .catch(error => console.error('Error loading edit mode:', error));
    }

    toggleEditMode() {
        const table = document.getElementById('table');
        const selectButton = document.getElementById('selectButton');
    
        let editEnabled = false;
    
        selectButton.addEventListener('click', () => {
            editEnabled = !editEnabled;
            selectButton.textContent = editEnabled ? 'Disable edit mode' : 'Enable edit mode';
            if(editEnabled)
                table.addEventListener('click', this.handleClick);
            else
                table.removeEventListener('click', this.handleClick);
        });
    }

    getDataTagFromClick() {
        // Attach a click event listener to the table
        const table = document.getElementById('table').addEventListener('click', (event) => {
            // Check if the clicked element has a "data-tag" attribute
            const dataTag = event.target.getAttribute('data-tag');
            if (dataTag) {
                console.log(`data-tag: "${dataTag}"`);
                // Perform any desired action with the dataTag
            }
        });
    }
    
    handleClick(event) {
        const inputField = document.getElementById('input-field');
    
        const currentText = event.target.innerText;
        inputField.value = currentText; // Pre-fill the input field with current text
        inputField.style.display = 'block'; // Show the input field
    
        // Get the position
        const rect = event.target.getBoundingClientRect();
    
        // Position the input field directly below the clicked <td>
        inputField.style.left = `${rect.left}px`;
        inputField.style.top = `${rect.bottom + window.scrollY}px`; // Account for page scroll
    
        inputField.style.width = currentText.length + 'px';
    
        // Focus the input field
        inputField.focus();
    
        // Adjust the width of the input field based on the current text
        this.adjustInputWidth(inputField);
    
        // Adjust the width of the input field as the user types
        inputField.addEventListener('input', () => {
            this.adjustInputWidth(inputField);
        });
    
        inputField.onblur = () => {
            event.target.innerText = inputField.value;
            inputField.style.display = 'none'; // Hide the input field after submitting
        };
    };
    
    //  to adjust input field width based on text length
    adjustInputWidth(inputField) {
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
}
