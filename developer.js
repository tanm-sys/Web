 document.addEventListener('contextmenu', function (event) {
    event.preventDefault();
    showAnimatedAlert('Right-clicking is disabled on this website.');
  });

  function getComputedStyleProp(el, propName) {
    return window.getComputedStyle(el, null).getPropertyValue(propName);
  }

  function showAnimatedAlert(message) {
    const bodyBackgroundColor = getComputedStyleProp(document.body, 'background-color');
    const bodyFontColor = getComputedStyleProp(document.body, 'color');
    const bodyBoxShadow = getComputedStyleProp(document.body, 'box-shadow');

    const alertBox = document.createElement('div');
    alertBox.textContent = message;
    alertBox.style.position = 'fixed';
    alertBox.style.top = '50%';
    alertBox.style.left = '50%';
    alertBox.style.transform = 'translate(-50%, -50%)';
    alertBox.style.padding = '15px 20px';
    alertBox.style.border = '1px solid #ccc';
    alertBox.style.borderRadius = '6px';
    alertBox.style.backgroundColor = bodyBackgroundColor;
    alertBox.style.color = bodyFontColor;
    alertBox.style.boxShadow = bodyBoxShadow;
    alertBox.style.zIndex = '9999';
    alertBox.style.opacity = '0';

    document.body.appendChild(alertBox);

    // Animate the alert box using anime.js
    anime.timeline({
      targets: alertBox,
      easing: 'easeInOutQuad',
      duration: 1000,
    })
    .add({
      opacity: 1,
      scale: [1, 1.2],
    })
    .add({
      scale: 1,
    })
    .add({
      rotate: 360,
      duration: 800,
    })
    .add({
      translateY: ['-50%', '-55%', '-50%'],
      duration: 600,
    })
    .add({
      translateY: ['-50%', '-45%', '-50%'],
    })
    .add({
      translateY: ['-45%', '-50%', '-45%'],
    })
    .add({
      translateY: ['-50%', '-55%', '-50%'],
      scale: 1.1,
    })
    .add({
      translateY: ['-55%', '-50%', '-55%'],
      scale: 1,
    })
    .add({
      translateY: ['-50%', '-45%', '-50%'],
      scale: 1.1,
    })
    .add({
      translateY: ['-45%', '-50%', '-45%'],
      scale: 1,
    })
    .add({
      translateY: ['-50%', '-52%', '-50%'],
      scale: 1.03,
    })
    .add({
      translateY: ['-52%', '-50%', '-52%'],
      scale: 1,
    })
    .add({
      translateY: ['-50%', '-51%', '-50%'],
      scale: 1.01,
      rotate: 5,
    })
    .add({
      translateY: ['-51%', '-50%', '-51%'],
      scale: 1,
      rotate: 0,
    })
    .add({
      opacity: 0,
      translateY: ['-50%', '-50%', '-55%'],
      scale: 1,
      rotate: 180,
      duration: 500,
      complete: function() {
        alertBox.remove();
      },
    });
  }
