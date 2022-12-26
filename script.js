// Get an array with numbers 0 to 9
const numbers = Array(10).fill().map((_, i) => (i)).reverse();

// Get the div where numbers will be 
const numberDiv = document.querySelector('.numbers');

numbers.forEach(num => {
    const button = document.createElement('button');
    button.classList.add('number');
    button.textContent = num;
    button.value = num;
    numberDiv.appendChild(button);
});