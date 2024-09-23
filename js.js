let input_columns = 4;
let input_rows = 5;
const inputContainer = document.querySelector("#calculator-input-container");

function createInputButtons() {
    const inputButtonContainer = document.createElement("div");
    inputButtonContainer.classList.add("input-button-container");
    inputButtonContainer.style.width = `${inputContainer.offsetWidth / input_columns}px`;
    inputButtonContainer.style.height = `${inputContainer.offsetHeight / input_rows}px`;

    const inputButton = document.createElement("button");
    inputButton.classList.add("input-button");
    inputButtonContainer.appendChild(inputButton);
    for (let i = 0; i < input_rows; ++i) {
        for (let j = 0; j < input_columns; ++j) {
            let newButton = inputButtonContainer.cloneNode(true);
            if (j === 3) {
                //Last column are all operators
                newButton.firstChild.classList.add("operator-button");
            } else if ((j < input_columns - 1 && (i > 0 && i < input_rows - 1)) || i == input_rows - 1 && j == 1) {
                newButton.firstChild.classList.add("number-button");
            }
            inputContainer.appendChild(newButton);
        }
    }
}

function populateButtons() {
    const inputButtons = document.querySelectorAll(".input-button");
    let operators = ["/", "*", "-", "+", "="];
    let numbers = ["7", "8", "9", "4", "5", "6", "1", "2", "3", "0"];
    let functions = ["AC", "+/-", "%", ":)", "."];

    for (button of inputButtons) {
        if (button.classList.contains("operator-button")) {
            button.textContent = operators.shift();
        }
        else if (button.classList.contains("number-button")) {
            button.textContent = numbers.shift();
        } else {
            button.textContent = functions.shift();
        }
    }
}
createInputButtons();
populateButtons();
