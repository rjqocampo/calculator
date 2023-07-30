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

buttonsNumber.forEach(button => {
    button.addEventListener('click', (event) => {
        if (displayNumber.textContent === '0') {
            displayValue = '';
        } else if (displayNumber.textContent === '-0') {
            displayValue = '-'
        }
        displayValue = displayValue + event.target.textContent;
        showDisplay();
    });
})

buttonsOperator.forEach(button => {
    button.addEventListener('click', (event) => {
        getDisplayValue();  
        assignAB(); 
        operate();
        assignOperator(event);
        showOperator(event);
    });
})

function operate () {
    displayValue = '';

    if (operator === '/' && (a === 0 || b == 0)) {
        alert('Why did the mathematician try to divide by zero?\n\n Oh, you know, just for the thrill of breaking the laws of the universe and watching calculators cry!')
        return;
    }

    if (a !== null && b !== null) {
        if (operator === '+') {
            let value = hasDecimals(add(a, b));
            a = b;
            b = value; 
            displayNumber.textContent = b;
        } else if (operator === '-') {
            let value = hasDecimals(subtract(a, b));
            a = b;
            b = value;
            displayNumber.textContent = b;
        } else if (operator === '*') {
            let value = hasDecimals(multiply(a, b));
            a = b;
            b = value;
            displayNumber.textContent = b;
        } else if (operator === '/') {
            let value = hasDecimals(divide(a, b));
            a = b;
            b = value;
            displayNumber.textContent = b;
        }  
    };
};

function hasDecimals(n) {
    if (Number.isInteger(n)) {
        return n;
    } else {
        return n.toFixed(2);
    }
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
        showDisplay();
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
    if (displayNumber.textContent === '0') {
        return;
    } else {
        displayNumber.textContent = displayNumber.textContent.slice(0, displayNumber.textContent.length - 1);
    }
}

function assignAB() {
    a = b;
    b = displayValue;
}

function assignOperator(event) {
    operator = event.target.textContent;
}

function showOperator() {
    displayOperator.textContent = operator;
}

function getDisplayValue() {
    displayValue = parseFloat(displayNumber.textContent);
}

function showDisplay() {
    displayNumber.textContent = displayValue;
}

const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;

showDisplay();

/**
    when clearing entry, negative is remove
    add keyboard support
 */
