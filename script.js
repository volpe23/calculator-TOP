// Get an array with numbers 0 to 9
const numbers = Array(10).fill().map((_, i) => (i)).reverse();
numbers.push('.')
numbers.splice(numbers.length-2, 0, '+/-');

const operations = document.querySelectorAll('.operation');
console.log(operations)
operations.forEach(el => {
    el.addEventListener('click', () => {
        if (el.value === '=') {
            calculation(lastOperation, +lastInput, +input.textContent);
        } else {
            operationEvent(el.value);
            

        }
    });
});

const opRegex = /[=+\-*/]/

const input = document.querySelector('#inputField'); // Input field where numbers are added
input.textContent = '0'
let lastInput = null;
let lastOperation = null;
let cleared = false;

const deleteBtn = document.querySelector('#delete');
deleteBtn.addEventListener('click', () => deleteLastDigit());

function getCurrentValue() {
    return input.textContent;
}

const clearAllButton = document.querySelector('#deleteAll');
clearAllButton.addEventListener('click', () => clearAll());
// Get the div where numbers will be 
const numberDiv = document.querySelector('.numbers');

// Add numbers to the calculator
numbers.forEach(num => {
    const button = document.createElement('button');
    button.classList.add('number');
    if (num === 0) button.classList.add('zero')
    button.textContent = num;
    button.value = num;
    if (typeof(num) === 'number') {
        button.addEventListener('click', (e) => numberEvent(e.target.value));
    } else {
        if (num === '+/-') button.addEventListener('click', () => changeSign());
        if (num === '.') button.addEventListener('click', () => addComma());
    }
    numberDiv.appendChild(button);

});

function numberEvent(num) {

    if (lastInput === null && lastOperation === null) {
        if (input.textContent === '0') {
            input.textContent = '';
            
        }
        input.textContent += num;
    } else if (needClear()) {
        lastInput = getCurrentValue()
        input.textContent = '';
        cleared = true;
        input.textContent += num;
    } 
    else input.textContent += num;
    
}

function operationEvent(op) {
     
    if (lastOperation === null) {
        lastOperation = op;
        lastInput = getCurrentValue();
        console.log('operation set');
        cleared = false;
    }
    else if (lastInput) calculation(lastOperation, +lastInput, +input.textContent);
    
}
function calculation(operation, numberOne, numberTwo) {
    // cleared = false;
    lastOperation = null;
    if (operation === '+') {
        input.textContent = numberOne + numberTwo;
        return numberOne + numberTwo;
    }
    else if (operation === '-') {
        input.textContent = numberOne - numberTwo;
        return numberOne - numberTwo;
    }
    else if (operation === '/') {
        if (numberTwo === 0) return false
        input.textContent = numberOne / numberTwo;
        return numberOne / numberTwo;
    }
    else if (operation === '*') { 
        input.textContent = numberOne * numberTwo;
        return numberOne * numberTwo;
    }
}

function needClear() {
    if (lastOperation && !cleared) {
        return true;
    }
    return false;
}

function addComma() {
    if (input.textContent.includes('.')) return false;
    input.textContent += '.';
}

function changeSign() {
    if (input.textContent.includes('-')) input.textContent = input.textContent.slice(1);
    else input.textContent = '-' + input.textContent;
}

function deleteLastDigit() {
    input.textContent = input.textContent.slice(0, -1);
    if (input.textContent.length === 0) input.textContent = '0';
}

function clearAll() {
    lastInput = null;
    lastOperation = null;
    input.textContent = '0';
}

window.addEventListener('keydown', e => {
    
    const val = (e.key);
    if (/\d/.test(val)) {
        if (input.textContent === '0') input.textContent = ''
        numberEvent(val)
        console.log('number')
    } else if (/[+\-*/]/.test(val)) {
        operationEvent(val);
    } else if ((val === 'Enter' || val === '=') && lastOperation) {
        
        calculation(lastOperation, +lastInput, +input.textContent);
        // lastInput = temp;
        // console.log('show sum')
    } else if (val === 'Backspace') {
        deleteLastDigit();
    } else if (val === '.') addComma();
    else return false;
})