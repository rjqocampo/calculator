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
        if (displayValue === '0') {
            displayValue = '';
        } else if (displayValue === '-0') {
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
        showDisplay();
        // emptyDisplayValue();
    });
})

function operate () {
    if (operator === '/' && (a === 0 || b === 0)) {
        alert('Math error')
        return;
    }

    console.log(`A: ${a} B: ${b}`)
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
    } else if (operator === '*') {
        let value = hasDecimals(multiply(a, b));
        a = b;
        b = value;
        displayValue = b;
    } else if (operator === '/') {
        let value = hasDecimals(divide(a, b));
        a = b;
        b = value;
        displayValue = b;
    }  
};

function hasDecimals(n) {
    if (Number.isInteger(n)) {
        return n;
    } else {
        return n.toFixed(2);
    };
}

function toggleNegative() { 
    if (displayValue === '0') {
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
    displayValue = value.toString();
    displayValue = value;

    showDisplay();
}

function decimal() {
    if (displayValue.includes('.')) { 
        return;
    } else if (displayValue === '' || displayValue === '0') {
        displayValue = '0.'
    } else {
        displayValue = displayValue + '.';
    };

    showDisplay();
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
    if (displayValue === '0') {
        return;
    } else if (displayValue.includes('-') && displayValue.length === 2) {
        console.log('bug')
    } else {
        displayValue = displayValue.slice(0, displayValue.length - 1);
    };

    showDisplay();
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
    displayValue = parseFloat(displayValue);
}

function emptyDisplayValue() {
    displayValue = '0';
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
clear entry should not empty the display

main cause of bugs:
displayValue
displayNumber.textContent

displayValue and displayNumber not in sync
clear entry and negative mutates displayNumber, but not displayValue. 
when mutating displayNumber, then clicking on numbers, it shows different values
 */