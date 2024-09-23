let input_columns = 4;
let input_rows = 5;
const inputContainer = document.querySelector("#calculator-input-container");

function createInputButtons() {
    const inputButtonContainer = document.createElement("div");
    inputButtonContainer.classList.add("input-button-container");
    inputButtonContainer.style.width = `${inputContainer.offsetWidth / input_columns}px`;
    inputButtonContainer.style.height = `${inputContainer.offsetHeight / input_rows}px`;

    const inputButton = document.createElement("div");
    inputButton.classList.add("input-button");
    inputButtonContainer.appendChild(inputButton);
    for (let i = 0; i < input_columns; ++i) {
        for (let j = 0; j < input_rows; ++j) {
            let newButton = inputButtonContainer.cloneNode(true);
            inputContainer.appendChild(newButton);
        }
    }
}

createInputButtons();
// inputButton = document.createElement("div");