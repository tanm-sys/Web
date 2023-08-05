const loadingBar = document.querySelector('.loading-bar');
    const percentageLabel = document.querySelector('.percentage-label');

    // Set the duration of the animation in milliseconds (adjust as needed)
    const animationDuration = 2000;
    // Set the target progress value (e.g., 100%)
    const targetProgress = 100;

    // Create the anime.js animation for the loading bar
    anime({
      targets: loadingBar,
      width: `${targetProgress}%`,
      duration: animationDuration,
      easing: 'easeInOutSine', // Built-in easing function for smoother animation
      update: (animation) => {
        // Update the percentage label during the animation
        const currentProgress = animation.progress;
        const percentage = Math.round((currentProgress / animation.duration) * 100);
        updatePercentage(percentage);
      },
      complete: () => {
        // Animation complete, hide the preloader after a short delay for smooth transition
        anime({
          targets: '.preloader',
          opacity: 0,
          duration: 500,
          complete: () => {
            document.querySelector('.preloader').style.display = 'none';
            // Call a custom function here if needed after the loading is complete
            // e.g., onLoadComplete();
          },
        });
      },
    });

    // Function to update the percentage label with dynamic color change
    function updatePercentage(percentage) {
      percentageLabel.textContent = `${percentage}%`;
      // Update the label color dynamically based on the percentage
      const hue = Math.floor((percentage * 1.2) % 360); // Vary the hue from 0 to 360
      percentageLabel.style.color = `hsl(${hue}, 100%, 50%)`;
    }

    // Create an animated particle background using anime.js
    const canvas = document.getElementById('background');
    const ctx = canvas.getContext('2d');

    function createParticle(x, y, radius, color) {
      const particle = {
        x,
        y,
        radius,
        color,
        angle: Math.random() * Math.PI * 2,
        speed: Math.random() * 2 + 1,
        draw: function () {
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
          ctx.fillStyle = this.color;
          ctx.fill();
        },
        update: function () {
          this.x += Math.cos(this.angle) * this.speed;
          this.y += Math.sin(this.angle) * this.speed;

          // Bounce particles off the canvas edges
          if (this.x - this.radius < 0 || this.x + this.radius > canvas.width) {
            this.angle = Math.PI - this.angle;
          }
          if (this.y - this.radius < 0 || this.y + this.radius > canvas.height) {
            this.angle = -this.angle;
          }
        },
      };
      return particle;
    }

    const particles = [];
    const particleColors = ['#f39c12', '#e74c3c', '#3498db', '#2ecc71'];

    function animateParticles() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((particle, index) => {
        particle.update();
        particle.draw();

        // Particle interactions with the loading bar
        const distanceX = particle.x - loadingBar.getBoundingClientRect().left;
        const distanceY = particle.y - loadingBar.getBoundingClientRect().top;
        const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
        if (distance < 50 && particle.speed < 5) {
          particle.speed += 1;
        } else if (particle.speed > 1) {
          particle.speed -= 0.1;
        }

        // Remove particle if it goes out of the canvas
        if (
          particle.x < 0 ||
          particle.x > canvas.width ||
          particle.y < 0 ||
          particle.y > canvas.height
        ) {
          particles.splice(index, 1);
        }
      });

      requestAnimationFrame(animateParticles);
    }

    function spawnParticles() {
      if (particles.length < 100) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const radius = Math.random() * 2 + 1;
        const color = particleColors[Math.floor(Math.random() * particleColors.length)];
        particles.push(createParticle(x, y, radius, color));
      }

      requestAnimationFrame(spawnParticles);
    }

    // Create a dynamic gradient for the background
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, '#3498db');
    gradient.addColorStop(1, '#e74c3c');

    function animateBackground() {
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      requestAnimationFrame(animateBackground);
    }

    // Handle window resize for responsive canvas size
    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      // Recreate the dynamic gradient after resizing
      gradient.addColorStop(0, '#3498db');
      gradient.addColorStop(1, '#e74c3c');
    }

    window.addEventListener('resize', resizeCanvas);

    // Start the particle animations and background animation
    resizeCanvas();
    spawnParticles();
    animateParticles();
    animateBackground();
  
