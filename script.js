const buttonsNumber = document.querySelectorAll('.button-number');
const buttonsOperator = document.querySelectorAll('.button-operator');
const display = document.querySelector('#display');

let a = null;
let b = null;
let operator = '';
let displayValue = '';

buttonsNumber.forEach(button => {
    button.addEventListener('click', (event) => {
        displayValue = displayValue + event.target.textContent;
        showDisplay()
    });
})

buttonsOperator.forEach(button => {
    button.addEventListener('click', (event) => {
        getDisplayValue();
        clearDisplay();
        assignAB();
        operate();
        assignOperator(event);
    });
})

function operate () {
    displayValue = '';
    if (a !== null & b !== null) {
        if (operator === '+') {
            console.log('+');
            let value = add(a, b);
            b = value;
            display.textContent = value;
            console.log(value);
        } else if (operator === '-') {
            console.log('-');
            let value = subtract(a, b);
            b = value;
            display.textContent = value;
            console.log(value);
        }
        // else if (operator === '*') {display.textContent = multiply(a, b)}
        // else if (operator === '/') {display.textContent = divide(a, b)};
    }
}

function assignOperator(event) {
    operator = event.target.textContent;
}

function getDisplayValue() {
    displayValue = parseInt(display.textContent);
}

function assignAB() {
    a = b;
    b = displayValue;
}

function clearDisplay() {
    display.textContent = '';
}

function displayNumber(event) {
    if (display.textContent === '0') {
        display.textContent = '';
    }
    display.textContent += event.target.textContent;
}

function showDisplay() {
    display.textContent = displayValue;
}


const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;
/**
after operator, display should clear because getting wrong value for b


 */