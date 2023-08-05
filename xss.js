function sanitizeInput(input) {
      return DOMPurify.sanitize(input);
    }

    function handleUserInput() {
      const userInput = document.getElementById('user-input').value;
      const sanitizedInput = sanitizeInput(userInput);
      document.getElementById('output').innerHTML = sanitizedInput;
    }
