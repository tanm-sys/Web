$(document).ready(function () {
  // Variables for loader and content elements
  var $loader = $(".loader");
  var $content = $(".content");
  
  // Variable to track whether the page is fully loaded
  var isPageLoaded = false;

  // Function to handle the loader fade-out and content display
  function handleLoader() {
    if (isPageLoaded) {
      $loader.fadeOut("slow", function () {
        // Use hide() instead of remove() if the intention is to hide the loader
        $(this).hide();
      });

      $("body").css("overflow", "visible");
      $content.fadeIn("slow");
    }
  }

  // The window load event triggers when the entire page, including all images and content, is fully loaded.
  $(window).on("load", function () {
    // Set isPageLoaded to true when the window has fully loaded
    isPageLoaded = true;

    // Ensure that the loader is hidden only after the specified delay
    setTimeout(handleLoader, 2000); // milliseconds

    // Clear the second timeout to prevent unnecessary calls to handleLoader
    clearTimeout(secondTimeout);
  });

  // Handle errors or exceptions during the setTimeout function
  window.addEventListener("error", function (event) {
    console.error("An error occurred: ", event.error);
    // If an error occurs, ensure that the loader is still hidden
    $loader.fadeOut("slow", function () {
      $(this).hide();
    });

    $("body").css("overflow", "visible");
    $content.fadeIn("slow");
  });

  // Handle user actions (resize or navigation) before the 2-second delay
  var secondTimeout = setTimeout(function () {
    // If the user tries to leave the page before the loader is hidden, prevent the fade-out
    isPageLoaded = false;
    $loader.stop(true, true);
  }, 5000); // Adjust the timeout value as needed
});
