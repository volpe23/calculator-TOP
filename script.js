// Get an array with numbers 0 to 9
const numbers = Array(10).fill().map((_, i) => (i)).reverse();
numbers.push('.')
numbers.splice(numbers.length-2, 0, '+/-');
// Get the div where numbers will be 
const numberDiv = document.querySelector('.numbers');

numbers.forEach(num => {
    const button = document.createElement('button');
    button.classList.add('number');
    if (num === 0) button.classList.add('zero')
    button.textContent = num;
    button.value = num;
    numberDiv.appendChild(button);
});