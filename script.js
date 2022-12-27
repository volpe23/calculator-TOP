// Get an array with numbers 0 to 9
const numbers = Array(10).fill().map((_, i) => (i)).reverse();
numbers.push('.')
numbers.splice(numbers.length-2, 0, '+/-');

const input = document.querySelector('#inputField'); // Input field where numbers are added

// Get the div where numbers will be 
const numberDiv = document.querySelector('.numbers');

numbers.forEach(num => {
    const button = document.createElement('button');
    button.classList.add('number');
    if (num === 0) button.classList.add('zero')
    button.textContent = num;
    button.value = num;
    if (typeof(num) === 'number') {
        button.addEventListener('click', numberEvent);
    } else {
        console.log(typeof(num))
    }
    numberDiv.appendChild(button);

});

function numberEvent(e) {
    input.textContent += e.target.value
}

function operationEvent(e) {
    console.log('hey')
}

window.addEventListener('keydown', e => {

    const val = +(e.key);
    if (val) {
        input.textContent += val;
    }
})