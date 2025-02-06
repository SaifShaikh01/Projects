let input = document.getElementById('inputBox');
let buttons = document.querySelectorAll('button');

let string = "";
let arr = Array.from(buttons);

arr.forEach(button => {
    button.addEventListener('click', (e) => handleInput(e.target.innerHTML));
});

// Function to handle input from both mouse clicks and keyboard
function handleInput(value) {
    // Ensure that input is not duplicated
    if (value === '=') {
        try {
            string = eval(string);
            input.value = string;
        } catch (error) {
            input.value = "Error";
        }
    } 
    else if (value === 'AC') {
        string = "";
        input.value = string;
    } 
    else if (value === 'DEL') {
        string = string.substring(0, string.length - 1);
        input.value = string;
    } 
    else {
        // Avoid appending a second time if same key is pressed
        if (string !== "" || value === '0' || !isNaN(value) || value === '.' || value === '-' || value === '+') {
            string += value;
            input.value = string;
        }
    }
}

// Event listener for keyboard input
document.addEventListener('keydown', (event) => {
    let key = event.key;

    // Prevent default actions for unwanted keys like arrows or F keys
    if (event.key.length === 1 || key === 'Enter' || key === 'Backspace' || key === 'Escape') {
        event.preventDefault(); // Prevent the default action (like scrolling or zooming)

        if (!isNaN(key) || key === '.' || key === '+' || key === '-' || key === '*' || key === '/' || key === '%') {
            handleInput(key);
        } 
        else if (key === 'Enter') {
            handleInput('=');
        } 
        else if (key === 'Backspace') {
            handleInput('DEL');
        } 
        else if (key === 'Escape') {
            handleInput('AC');
        }
    }
});