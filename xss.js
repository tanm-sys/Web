import DOMPurify from "dompurify";

const inputField = DOMPurify.sanitize(document.getElementById("user-input"));
const outputField = document.getElementById("output");

function sanitize(input) {
  return DOMPurify.sanitize(input);
}

function displayUserInput() {
  const userInput = sanitize(inputField.value);
  outputField.textContent = userInput;
  inputField.value = ""; // Clear the input field after displaying the user's input
}

inputField.addEventListener("input", displayUserInput);

function handleError(error) {
  console.error(error); // Log any errors that occur during sanitization
}

// Add error handling to the sanitize function
function sanitize(input) {
  try {
    return DOMPurify.sanitize(input);
  } catch (error) {
    handleError(error);
  }
}

// Handle edge cases
function displayUserInput() {
  const userInput = sanitize(inputField.value);
  if (userInput === "") {
    // Handle the case where the user enters a blank string
    outputField.textContent = "";
  } else {
    outputField.textContent = userInput;
    inputField.value = ""; // Clear the input field after displaying the user's input
  }
}
