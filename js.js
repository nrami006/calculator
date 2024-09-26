let INPUT_COLUMNS = 4;
let INPUT_ROWS = 5;
const inputContainer = document.querySelector("#calculator-input-container");
let leftNumber = null;
let rightNumber = null;
let operator = null;
let result = null;
let beginningRightNum = false;
let firstNumInput = true;
let clearDisplay = false;
const calculatorDisplay = document.querySelector("#results");

function numberWithCommas(x) {
    if (x != null) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    return "";
}

function operate() {
    switch (operator) {
        case "addButton":
            result = leftNumber + rightNumber;
            break;
        case "subtractButton":
            result = leftNumber - rightNumber;
            break;
        case "divideButton":
            result = leftNumber / rightNumber;
            break;
        case "multiplyButton":
            result = leftNumber * rightNumber;
            break;
        default:
            break;
    }
    if (result == Infinity) {
        console.log("inf");
        calculatorDisplay.textContent = "bruh";
        clearDisplay = true;
        operator = null;
        rightNumber = null;
        leftNumber = null;
        return;
    }
    if (result % 1 != 0 && result != null) {
        result = Number(result).toFixed(3);
    }
    calculatorDisplay.textContent = numberWithCommas(result);
    operator = null;
    rightNumber = null;
    leftNumber = null;
    clearDisplay = true;
}
// on click event handler for inputButtons
function onClick(event) {
    const button = event.target;
    if (button.classList.contains("operator-button")) {
        if (operator != null && !beginningRightNum) {
            // need to do existing operation first.
            rightNumber = Number(calculatorDisplay.textContent.replace(/,/g, ""));
            operate();
        }
        // set new operator
        operator = button.id;
        if (operator == "equalsButton") {
            operate();
            return;
        }
        if (leftNumber == null) {
            // Set left number (without commas)
            leftNumber = Number(calculatorDisplay.textContent.replace(/,/g, ""));
            if (result == null) {
                // calculatorDisplay.textContent = "0";
                // firstNumInput = true;
                clearDisplay = true;
            }
            beginningRightNum = true;
        } else if (rightNumber == null && !beginningRightNum) {
            // set right number and compute the operation
            rightNumber = Number(calculatorDisplay.textContent.replace(/,/g, ""));
            operate();
        } else {

        }


    } else if (button.classList.contains("number-button")) {
        // This button is a number button
        if (clearDisplay) {
            calculatorDisplay.textContent = "";
            clearDisplay = false;
        }
        // Initially calculator shows 0. When a number is first input, clear away the 0 first.
        else if (calculatorDisplay.textContent === "0") {
            calculatorDisplay.textContent = "";
        }

        // If we are inputting a second number, clear the display first.
        if (beginningRightNum) {
            calculatorDisplay.textContent = "";
            beginningRightNum = false;
        }
        // Add number to display
        let newNum = Number((calculatorDisplay.textContent + button.textContent).replace(/,/g, ""));
        calculatorDisplay.textContent = numberWithCommas(newNum);
        firstNumInput = false
    } else {
        // This button is a feature button (AC, +/-, %, :), and .)
        if (button.textContent == "AC") {
            // Clear display & all numbers
            leftNumber = null;
            rightNumber = null;
            operator = null;
            result = null;
            calculatorDisplay.textContent = "0";
        }
    }
}

function createInputButtons() {
    // Create a button that will be cloned in the loop
    const inputButton = document.createElement("button");
    inputButton.classList.add("input-button");
    inputButton.style.flexBasis = `${1 / INPUT_ROWS * 100}%`;
    // Nested for loops to create the input button grid
    for (let i = 0; i < INPUT_ROWS; ++i) {
        for (let j = 0; j < INPUT_COLUMNS; ++j) {
            let newButton = inputButton.cloneNode(true);
            newButton.addEventListener("click", onClick);
            if (j === 3) {
                //Last column are all operators
                newButton.classList.add("operator-button");
            } else if ((j < INPUT_COLUMNS - 1 && (i > 0 && i < INPUT_ROWS - 1)) || i == INPUT_ROWS - 1 && j == 1) {
                //These buttons are number buttons
                newButton.classList.add("number-button");
            }
            // if not a operator or number, then it is a feature button.
            inputContainer.appendChild(newButton);
        }
    }
}

// Found on stackoverflow... apparently can affect legacy compatibility...but for now it works.
function decodeHtml(html) {
    var txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
}

function populateButtons() {
    // Get a node list of all input buttons
    const inputButtons = document.querySelectorAll(".input-button");
    // These arrays are used to assign the text content of each button.
    let operators = [`${decodeHtml("&divide;")}`, `${decodeHtml("&times;")}`, `${decodeHtml("&minus;")}`, `${decodeHtml("&plus;")}`, `${decodeHtml("&equals;")}`];
    let operatorIds = ["divideButton", "multiplyButton", "subtractButton", "addButton", "equalsButton"];
    let numbers = ["7", "8", "9", "4", "5", "6", "1", "2", "3", "0"];
    let functions = ["AC", "+/-", "%", ":)", "."];

    for (button of inputButtons) {
        if (button.classList.contains("operator-button")) {
            button.textContent = operators.shift();
            // button.setAttribute("id", operatorIds.shift());
            button.id = operatorIds.shift();
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
