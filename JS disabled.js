"use strict";
document.addEventListener("DOMContentLoaded", function() {
      var jsDisabledMessage = document.getElementById("js-disabled-message");
      jsDisabledMessage.style.display = "block"
        anime({
        targets: jsDisabledMessage,
        opacity: [0, 1],
        translateY: [-20, 0],
        duration: 1000,
        easing: 'easeInOutSine'
      });
    });
