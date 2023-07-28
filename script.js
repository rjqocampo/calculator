const buttonsNumber = document.querySelectorAll('.button-number');
const buttonsOperator = document.querySelectorAll('.button-operator');
const buttonClear = document.querySelector('#clear');
const displayNumber = document.querySelector('#display-number');
const displayOperator = document.querySelector('#display-operator');

let a = null;
let b = null;
let operator = '';
let displayValue = '0';

// listen for number buttons. append numbers to string of displayValue then show
buttonsNumber.forEach(button => {
    button.addEventListener('click', (event) => {
        if (displayNumber.textContent === '0') {
            displayValue = '';
        }
        displayValue = displayValue + event.target.textContent;
        showDisplay()
    });
})

buttonsOperator.forEach(button => {
    button.addEventListener('click', (event) => {
        getDisplayValue(); 
        // clearDisplay(); 
        assignAB();
        operate();
        assignOperator(event);
        showOperator();
    });
})

buttonClear.addEventListener('click', clear)

function operate () {
    displayValue = '';
    if (a !== null & b !== null) {
        if (operator === '+') {
            let value = add(a, b);
            b = value; 
            displayNumber.textContent = value;
        } else if (operator === '-') {
            let value = subtract(a, b);
            b = value;
            displayNumber.textContent = value;
        } else if (operator === '*') {
            let value = multiply(a, b);
            b = value;
            displayNumber.textContent = value;
        } else if (operator === '/') {
            let value = divide(a, b);
            b = value;
            displayNumber.textContent = value;
        };
    };
};

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

function clear() {
    a = null;
    b = null;
    operator = '';
    displayValue = '0';
    showDisplay();
    showOperator();
}

const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;

showDisplay();
/**

 */