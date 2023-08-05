function addImageHoverAnimation() {
    const images = document.querySelectorAll('.post-body img');

    images.forEach((img) => {
      img.addEventListener('mouseenter', () => {
        anime({
          targets: img,
          scale: 1.2, 
          rotate: '1turn', 
          opacity: 0.8, 
          duration: 500, 
          easing: 'easeInOutQuart', 
        });
      });

      img.addEventListener('mouseleave', () => {
        anime({
          targets: img,
          scale: 1, 
          rotate: 0, 
          opacity: 1, 
          duration: 500, 
          easing: 'easeInOutQuart', 
        });
      });
    });
  }


  document.addEventListener('DOMContentLoaded', addImageHoverAnimation);

