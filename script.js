const buttonsNumber = document.querySelectorAll('.button-number');
const buttonsOperator = document.querySelectorAll('.button-operator');
const buttonClearAll = document.querySelector('#clear-all');
const buttonClearEntry = document.querySelector('#clear-entry');
const buttonPercentage = document.querySelector('#percentage');
const buttonNegative = document.querySelector('#negative')
const buttonDecimal = document.querySelector ('#decimal');
const displayNumber = document.querySelector('#display-number');
const displayOperator = document.querySelector('#display-operator');
const displayOperation = document.querySelector('#display-operation');

let a = null;
let b = null;
let operator = '';
let displayValue = '0';

buttonClearAll.addEventListener('click', clearAll);
buttonClearEntry.addEventListener('click', clearEntry);
buttonNegative.addEventListener('click', toggleNegative);
buttonPercentage.addEventListener('click', percentage);
buttonDecimal.addEventListener('click', decimal);

buttonsNumber.forEach(button => {
    button.addEventListener('click', (event) => {
        if (isNaN(displayValue)) {
            return;
        } else if (displayValue.toString().length > 8) {
            return;
        } else if (displayValue === '0') {
            displayValue = '';
        } else if (displayValue === '-0') {
            displayValue = '-'
        } else if (displayValue === b) {
            displayValue = ''
        }
        displayValue = displayValue + event.target.textContent;
        showDisplay();
    });
})

buttonsOperator.forEach(button => {
    button.addEventListener('click', (event) => {
        getDisplayValue();  
        assignAB(); 
        showOperation();
        operate();
        showDisplay();
        assignOperator(event);
    });
})

function operate () {
    if (operator === '÷' && (a === 0 || b === 0)) {
        alert('Why did the mathematician try to divide by zero?\n\n Oh, you know... just for the thrill of breaking the laws of the universe and watching calculators cry!')
        return;
    }

    if (operator === '+') {
        let value = hasDecimals(add(a, b));
        a = b;
        b = value; 
        displayValue = b;
    } else if (operator === '-') {
        let value = hasDecimals(subtract(a, b));
        a = b;
        b = value;
        displayValue = b;
    } else if (operator === '×') {
        let value = hasDecimals(multiply(a, b));
        a = b;
        b = value;
        displayValue = b;
    } else if (operator === '÷') {
        let value = hasDecimals(divide(a, b));
        a = b;
        b = value;
        displayValue = b;
    }  
};

function assignAB() {
    a = b;
    b = displayValue;
}

function assignOperator(event) {
    operator = event.target.textContent;
}

function showOperation() {
    if (a === null || b === null || operator === '=') {
        return;
    } else {
        displayOperation.textContent = `${a} ${operator} ${b}`;
    }
}

function getDisplayValue() {
    displayValue = parseFloat(displayValue);
}

function showDisplay() {
    displayNumber.textContent = displayValue;
}

function hasDecimals(n) {
    if (Number.isInteger(n)) {
        return n;
    } else {
        return n.toFixed(2);
    };
}

function toggleNegative() { 
    if (isNaN(displayValue)) {
        return;
    } else if (displayValue === '0') {
        return;
    } else if (displayValue.toString().includes('-')) {
        displayValue = displayValue.slice(1);
    } else {
        displayValue = '-' + displayValue;
    };

    showDisplay();
}

function percentage() {
    let value = parseFloat(displayValue) / 100;
    value = value.toFixed(2);
    displayValue = value.toString();
    displayValue = value;

    showDisplay();
}

function decimal() { 
    if (isNaN(displayValue)) {
        return;
    } else if (displayValue === b) {
        displayValue = '0.';
    } else if (displayValue.toString().includes('.')) { 
        return; 
    } else {
        displayValue = displayValue + '.';
    };

    showDisplay();
}

function clearAll() {
    a = null;
    b = null;
    operator = '';
    displayOperation.textContent = '\u00A0';
    displayValue = '0';
    showDisplay();
}

function clearEntry() {
    if (isNaN(displayValue)) {
        return;
    } else if (displayValue === '0') {
        return;
    } else if (displayValue.length === 1 || (displayValue.toString().includes('-') && displayValue.length === 2)) {
        displayValue = '0';
    } else {
        displayValue = displayValue.toString().slice(0, displayValue.length - 1);
    };

    showDisplay();
}

const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;

showDisplay();
