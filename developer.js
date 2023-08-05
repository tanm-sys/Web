document.addEventListener('contextmenu', function (event) {
    event.preventDefault();
    showAnimatedAlert('Right-clicking is disabled on this website.');
  });

  function showAnimatedAlert(message) {
    const alertBox = document.createElement('div');
    alertBox.textContent = message;
    alertBox.style.position = 'fixed';
    alertBox.style.top = '50%';
    alertBox.style.left = '50%';
    alertBox.style.transform = 'translate(-50%, -50%)';
    alertBox.style.padding = '15px 20px';
    alertBox.style.border = '1px solid #ccc';
    alertBox.style.borderRadius = '6px';
    alertBox.style.backgroundColor = '#f0f0f0';
    alertBox.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
    alertBox.style.zIndex = '9999';
    alertBox.style.opacity = '0';

    document.body.appendChild(alertBox);

   
    anime({
      targets: alertBox,
      opacity: 1,
      duration: 500,
      easing: 'easeInOutQuad',
    });

  
    setTimeout(function () {
      anime({
        targets: alertBox,
        opacity: 0,
        duration: 500,
        easing: 'easeInOutQuad',
        complete: function () {
          alertBox.remove();
        },
      });
    }, 3000); // Display the alert for 3 seconds
  }
