const buttonsNumber = document.querySelectorAll('.button-number');
const buttonsOperator = document.querySelectorAll('.button-operator');
const buttonClear = document.querySelector('#clear');
const displayNumber = document.querySelector('#display-number');
const displayOperator = document.querySelector('#display-operator');

let a = null;
let b = null;
let operator = '';
let displayValue = '';

// listen for number buttons. append numbers to string of displayValue then show
buttonsNumber.forEach(button => {
    button.addEventListener('click', (event) => {
        displayValue = displayValue + event.target.textContent;
        showDisplay()
    });
})

// listen for operator buttons. 
buttonsOperator.forEach(button => {
    button.addEventListener('click', (event) => {
        getDisplayValue(); 
        clearDisplay(); 
        assignAB();
        operate();
        assignOperator(event);
        showOperator();
    });
})

function operate () {
    displayValue = '';
    if (a !== null & b !== null) {
        if (operator === '+') {
            console.log('+');
            let value = add(a, b);
            b = value;
            displayNumber.textContent = value;
            console.log(value);
        } else if (operator === '-') {
            console.log('-');
            let value = subtract(a, b);
            b = value;
            displayNumber.textContent = value;
            console.log(value);
        }
        // else if (operator === '*') {displayNumber.textContent = multiply(a, b)}
        // else if (operator === '/') {displayNumber.textContent = divide(a, b)};
    }
}

function assignOperator(event) {
    operator = event.target.textContent;
}

function getDisplayValue() {
    displayValue = parseInt(displayNumber.textContent);
}

function assignAB() {
    a = b;
    b = displayValue;
}

function clearDisplay() {
    displayNumber.textContent = '';
}

function showOperator() {
    displayOperator.textContent = `${operator}`;
}

function showDisplay() {
    displayNumber.textContent = displayValue;
}

// clear all variables
buttonClear.addEventListener('click', () => {
    a = null;
    b = null;
    operator = '';
    displayValue = '';
    showDisplay();
    showOperator();
})


const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;


/**

 */