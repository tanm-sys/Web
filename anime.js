function addImageHoverAnimation() {
    const images = document.querySelectorAll('.post-body img');

    images.forEach((img) => {
      img.addEventListener('mouseenter', () => {
        anime({
          targets: img,
          scale: 1.2, // Increase the image size by 20% on hover
          opacity: 0.8, // Reduce opacity to 80% on hover
          translateX: 10, // Move the image 10 pixels to the right on hover
          translateY: -10, // Move the image 10 pixels up on hover
          duration: 500, // Animation duration in milliseconds (0.5 seconds)
          easing: 'easeInOutQuart', // Smooth easing function for more dynamic animation
        });
      });

      img.addEventListener('mouseleave', () => {
        anime({
          targets: img,
          scale: 1, // Reset the image size on mouse leave
          opacity: 1, // Reset opacity to 100% on mouse leave
          translateX: 0, // Reset the translation on mouse leave
          translateY: 0, // Reset the translation on mouse leave
          duration: 500, // Animation duration in milliseconds (0.5 seconds)
          easing: 'easeInOutQuart', // Smooth easing function for more dynamic animation
        });
      });
    });
  }

  // Call the function to add hover animation after the page loads
  document.addEventListener('DOMContentLoaded', addImageHoverAnimation);

