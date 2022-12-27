// Get an array with numbers 0 to 9
const numbers = Array(10).fill().map((_, i) => (i)).reverse();
numbers.push('.')
numbers.splice(numbers.length-2, 0, '+/-');

const operations = document.querySelectorAll('.operation');
console.log(operations)
operations.forEach(el => {
    el.addEventListener('click', () => {
        operationEvent();
        lastOperation = el.value;
    });
});

const opRegex = /[=+\-*/]/

const input = document.querySelector('#inputField'); // Input field where numbers are added
input.textContent = '0';
let lastInput = null;
let lastOperation = null;
let cleared = false;
// let currInput = '0'
// input.textContent = currInput;


const clearAllButton = document.querySelector('#deleteAll');
clearAllButton.addEventListener('click', () => clearAll())
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
        console.log(typeof(num))
    }
    numberDiv.appendChild(button);

});

function numberEvent(num) {

    if (lastInput === null && lastOperation === null) {
        if (input.textContent === '0') {
            input.textContent = '';
            
        }
        input.textContent += num;
    } else if (!cleared && lastOperation) {
        lastInput = input.textContent;
        input.textContent = '';
        cleared = true;
        input.textContent += num;
    } else if (cleared && lastOperation) {
        calculation(lastOperation, +lastInput, +input.textContent);
        
    }
}



function operationEvent() {
     
    if (lastOperation !== null && cleared === true) {
        console.log("Should show res")
        calculation(lastOperation, +lastInput, +input.textContent);
        cleared = false;
    }
        // calculation(lastOperation, +lastInput, +input.textContent);
    console.log(lastOperation, +lastInput, +input.textContent);
    
}
function calculation(operation, numberOne, numberTwo) {
    cleared = false;
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

function clearAll() {
    lastInput = null;
    lastOperation = null;
    input.textContent = '0';
}


window.addEventListener('keydown', e => {
    if (input.textContent === '0') input.textContent = ''
    const val = (e.key);
    if (/\d/.test(val)) {
        numberEvent(val)
        console.log('number')
    } else if (/[+\-*/]/.test(val)) {
        operationEvent();
        lastOperation = val;
        console.log('operation set');
    } else if ((val === 'Enter' || val === '=') && lastOperation) {
        const temp = input.textContent;
        calculation(lastOperation, +lastInput, +input.textContent);
        // lastInput = temp;
        console.log('show sum')
    }
    else return false;
})