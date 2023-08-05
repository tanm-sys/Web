function getComputedStyleProp(el, propName) {
    return window.getComputedStyle(el, null).getPropertyValue(propName);
  }

  function showAnimatedAlert(message, options) {
    const bodyBackgroundColor = getComputedStyleProp(document.body, 'background-color');

    options = Object.assign({
      backgroundColor: bodyBackgroundColor,
      textColor: '#fff',
      borderColor: 'transparent',
      fontSize: '20px',
      fontWeight: 'normal',
      padding: '15px 20px',
      borderRadius: '6px',
      animationDuration: 1000,
      numberOfBounces: 2,
      bounceScale: 1.1,
      rotateDegrees: 360,
      showDuration: 1200,
      fadeDuration: 500,
      position: {
        top: '50%',
        left: '50%',
        translateX: '-50%',
        translateY: '-50%',
      },
    }, options);

    const alertBox = document.createElement('div');
    alertBox.textContent = message;
    alertBox.style.position = 'fixed';
    alertBox.style.top = options.position.top;
    alertBox.style.left = options.position.left;
    alertBox.style.transform = `translate(${options.position.translateX}, ${options.position.translateY})`;
    alertBox.style.color = options.textColor;
    alertBox.style.fontSize = options.fontSize;
    alertBox.style.fontWeight = options.fontWeight;
    alertBox.style.padding = options.padding;
    alertBox.style.border = `1px solid ${options.borderColor}`;
    alertBox.style.borderRadius = options.borderRadius;
    alertBox.style.backgroundColor = options.backgroundColor;
    alertBox.style.boxShadow = `0 4px 8px rgba(0, 0, 0, 0.1)`;
    alertBox.style.zIndex = '9999';
    alertBox.style.opacity = '0';

    document.body.appendChild(alertBox);
      
    const timeline = anime.timeline({
      easing: 'easeInOutQuad',
      duration: options.animationDuration,
    });

    timeline.add({
      targets: alertBox,
      opacity: 1,
      scale: [1, options.bounceScale],
      rotate: [0, options.rotateDegrees],
    });

    for (let i = 0; i < options.numberOfBounces; i++) {
      timeline.add({
        targets: alertBox,
        scale: 1,
      });
      timeline.add({
        targets: alertBox,
        translateY: ['-50%', '-55%', '-50%'],
        scale: options.bounceScale,
      });
    }

    timeline.add({
      targets: alertBox,
      translateY: ['-50%', '-45%', '-50%'],
      scale: 1.1,
    })
    .add({
      targets: alertBox,
      translateY: ['-45%', '-50%', '-45%'],
      scale: 1,
    })
    .add({
      targets: alertBox,
      translateY: ['-50%', '-55%', '-50%'],
      scale: 1.1,
    })
    .add({
      targets: alertBox,
      translateY: ['-55%', '-50%', '-55%'],
      scale: 1,
    })
    .add({
      targets: alertBox,
      translateY: ['-50%', '-45%', '-50%'],
      scale: 1.1,
    })
    .add({
      targets: alertBox,
      translateY: ['-45%', '-50%', '-45%'],
      scale: 1,
    })
    .add({
      targets: alertBox,
      translateY: ['-50%', '-52%', '-50%'],
      scale: 1.03,
    })
    .add({
      targets: alertBox,
      translateY: ['-52%', '-50%', '-52%'],
      scale: 1,
    })
    .add({
      targets: alertBox,
      translateY: ['-50%', '-51%', '-50%'],
      scale: 1.01,
      rotate: 5,
    })
    .add({
      targets: alertBox,
      translateY: ['-51%', '-50%', '-51%'],
      scale: 1,
      rotate: 0,
    })
    .add({
      targets: alertBox,
      opacity: 0,
      translateY: ['-50%', '-50%', '-55%'],
      scale: 1,
      rotate: 180,
      duration: options.fadeDuration,
      complete: function() {
        alertBox.remove();
      },
    });
  }

  document.addEventListener('contextmenu', function(event) {
    event.preventDefault();
    const x = event.clientX;
    const y = event.clientY;
    showAnimatedAlert('Right-clicking is disabled on this website.', {
      position: {
        top: y + 'px',
        left: x + 'px',
      },
      backgroundColor: '#f0f0f0',
      textColor: '#333',
      borderColor: '#ccc',
      fontSize: '18px',
      fontWeight: 'bold',
      padding: '20px',
      borderRadius: '10px',
      animationDuration: 1000,
      numberOfBounces: 2,
      bounceScale: 1.1,
      rotateDegrees: 360,
      showDuration: 1200,
      fadeDuration: 500,
    });
  });
