const buttonsNumber = document.querySelectorAll('.button-number');
const buttonsOperator = document.querySelectorAll('.button-operator');
const buttonClearAll = document.querySelector('#clear-all');
const buttonClearEntry = document.querySelector('#clear-entry');
const buttonPercentage = document.querySelector('#percentage');
const buttonNegative = document.querySelector('#negative')
const buttonDecimal = document.querySelector ('#decimal');
const displayNumber = document.querySelector('#display-number');
const displayOperator = document.querySelector('#display-operator');

let a = null;
let b = null;
let operator = '';
let displayValue = '0';

buttonClearAll.addEventListener('click', clearAll);
buttonClearEntry.addEventListener('click', clearEntry);
buttonNegative.addEventListener('click', toggleNegative);
buttonPercentage.addEventListener('click', percentage);
buttonDecimal.addEventListener('click', decimal);

// listen for number buttons. append numbers to string of displayValue then show
buttonsNumber.forEach(button => {
    button.addEventListener('click', (event) => {
        if (displayNumber.textContent === '0') {
            displayValue = '';
        } else if (displayNumber.textContent === '-0') {
            displayValue = '-'
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

function operate () {
    displayValue = '';
    if (a !== null && b !== null) {
        if (operator === '+') {
            let value = add(a, b);
            a = b;
            b = value; 
            displayNumber.textContent = b;
        } else if (operator === '-') {
            let value = subtract(a, b);
            a = b;
            b = value;
            displayNumber.textContent = b;
        } else if (operator === '*') {
            let value = multiply(a, b);
            a = b;
            b = value;
            displayNumber.textContent = b;
        } else if (operator === '/') {
            let value = divide(a, b);
            a = b;
            b = value;
            displayNumber.textContent = b;
        }  
    };
};

function assignOperator(event) {
    operator = event.target.textContent;
}

function getDisplayValue() {
    displayValue = parseFloat(displayNumber.textContent);
}

function assignAB() {
    a = b;
    b = displayValue;
}

function clearDisplay() {
    displayNumber.textContent = '';
}

function showOperator() {
    displayOperator.textContent = operator;
}

function showDisplay() {
    displayNumber.textContent = displayValue;
}

function toggleNegative() { 
    if (displayNumber.textContent === '0') {
        return;
    } else if (displayNumber.textContent.includes('-')) {
        displayNumber.textContent = displayNumber.textContent.slice(1);
    } else {
        displayNumber.textContent = '-' + displayNumber.textContent;
    }
}

function percentage() {
    console.log(displayNumber.textContent);
    let value = parseFloat(displayNumber.textContent) / 100;
    displayValue = value.toString();
    displayNumber.textContent = value;
}

function decimal() {
    if (displayValue.includes('.')) { // ------------------- bug
        console.log('bug')
        return;
    } else if (displayValue === '' || displayValue === '0') {
        displayValue = '0.'
        showDisplay()
    } else {
        displayValue = displayValue + '.';
        showDisplay();
    }
}

function clearAll() {
    a = null;
    b = null;
    operator = '';
    displayValue = '0';
    showDisplay();
    showOperator();
}

function clearEntry() {
    console.log('test');
}

const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;

showDisplay();

/**
    bug '[Violation] 'click' handler took 3824ms'
    bug with decimal, displayValue.includes is not a function after using percentage. checking on a string
    add keyboard support
 */
