const buttonsNumber = document.querySelectorAll('.button-number');
const buttonsOperator = document.querySelectorAll('.button-operator');
const buttonClear = document.querySelector('#clear');
const buttonPercentage = document.querySelector('#percentage');
const buttonNegative = document.querySelector('#negative')
const buttonDecimal = document.querySelector ('#decimal');
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

buttonClear.addEventListener('click', clear);
buttonNegative.addEventListener('click', toggleNegative);
buttonPercentage.addEventListener('click', percentage);
buttonDecimal.addEventListener('click', decimal);

function operate () {
    displayValue = '';
    if (a !== null && b !== null) {
        if (operator === '+') {
            let value = add(a, b);
            // a = b;
            b = value; 
            displayNumber.textContent = b;
        } else if (operator === '-') {
            let value = subtract(a, b);
            b = value;
            displayNumber.textContent = b;
        } else if (operator === '*') {
            let value = multiply(a, b);
            b = value;
            displayNumber.textContent = b;
        } else if (operator === '/') {
            let value = divide(a, b);
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
    displayValue = value;
    displayNumber.textContent = value;
}

function decimal() {
    if (displayNumber.textContent.includes('.')) {
        return;
    } else if (displayValue === '' || displayValue === '0') {
        displayValue = '0.'
        showDisplay()
    } else {
        displayValue = displayValue + '.';
        showDisplay();
    }
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
    % is n / 100
    use slice(str.length - 1) for delete function
    minor bug when doing + then equals. number operates on itself
    minor bug, auto rounds to floor if there's decimals
    add decimals. should only use once on a string
    add keyboard support
 */

/**
    after an operation, when a and b are not null. toggle nega still refers to b instead of display

    if display.textContent is '0', don't do anything
    if a is null or b is null,
        if includes '-', slice(1)
        else if '-' + displayNumber.textContent
    if a not null and b not null,
        if includes '-', slice(1)
        else if '-' + b, might need to parse? 

    showDisplay();
 */