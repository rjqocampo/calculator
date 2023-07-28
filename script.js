let aInput = null;
let bInput = null;
let operator = '';
let currentValue = 0;

const add = (a, b) => a + b;
const subtract = (a, b) => a -b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;

function operate (a, b, operator) {
    if (operator === '+') {return add(a, b)}
    else if (operator === '-') {return subtract(a, b)}
    else if (operator === '*') {return multiply(a, b)}
    else if (operator === '/') {return divide(a, b)};
}

/**

 */