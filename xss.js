import DOMPurify from 'dompurify'; //DOMPurify function, which is used to sanitize HTML input.

const inputField = document.getElementById('user-input'); //code then retrieves the input field and output field elements from the HTML document using the document.getElementById() method.
const outputField = document.getElementById('output'); 

function sanitize(input) {
  return DOMPurify.sanitize(input); //The sanitize() function takes an input string and returns a sanitized version of the string using the DOMPurify.sanitize() method.
}

function displayUserInput() {
  const userInput = inputField.value;
  const sanitizedInput = sanitize(userInput);
  outputField.textContent = sanitizedInput; // use textContent instead of innerHTML for better security
}

inputField.addEventListener('input', displayUserInput);
//Overall, this code is a simple example of how to use the DOMPurify library to sanitize user input and prevent XSS attacks in web applications.
