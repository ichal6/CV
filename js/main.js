function load(currentLng, tag){
    const translate = new Translate();
    const attributeName = tag;
    translate.init(attributeName, currentLng);
    return translate.process(); 
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

function initializeEditMode(editMode) {
    if(editMode) {
        fetch('edit.html')
            .then(response => response.text())
            .then(data => {
                document.getElementById('edit-content').innerHTML = data;
                toggleEditMode();
            })
            .catch(error => console.error('Error loading edit mode:', error));
    }
}

function getDataTagFromClick() {
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

function handleClick(event) {
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
    adjustInputWidth(inputField);

    // Adjust the width of the input field as the user types
    inputField.addEventListener('input', () => {
        adjustInputWidth(inputField);
    });

    inputField.onblur = () => {
        event.target.innerText = inputField.value;
        inputField.style.display = 'none'; // Hide the input field after submitting
    };
};

function toggleEditMode() {
    const table = document.getElementById('table');
    const selectButton = document.getElementById('selectButton');

    let editEnabled = false;

    selectButton.addEventListener('click', () => {
        editEnabled = !editEnabled;
        selectButton.textContent = editEnabled ? 'Disable edit mode' : 'Enable edit mode';
        if(editEnabled)
            table.addEventListener('click', handleClick);
        else
            table.removeEventListener('click', handleClick);
    });
}

// Function to adjust input field width based on text length
function adjustInputWidth(inputField) {
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

// Parse language parameter from URL (default to browser language if not specified)
const urlParams = new URLSearchParams(window.location.search);
const userLang = urlParams.get("lang") || navigator.language.slice(0, 2);

const editMode = urlParams.has("edit") && urlParams.get("edit") == "yes";

initializeEditMode(editMode);

const langDict = load(userLang, 'data-tag');

getDataTagFromClick();

let el = document.querySelectorAll("h1, h2, h3, h4, h5, p, span, .text, .about-point");

lastSingleLetterToNewLine(el);
