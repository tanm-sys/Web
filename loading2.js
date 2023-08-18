$(document).ready(function() {
  $(window).on("load", function() {
    // Simulate some asynchronous process (e.g., loading content)
    setTimeout(function() {
      $(".loader").fadeOut("slow", function() {
        $(this).remove(); // Remove the loader element after fading out
      });

      // You can also reveal your content after the loader fades out
      $("body").css("overflow", "visible"); // Restore scrolling
      $(".content").fadeIn("slow"); // Replace ".content" with your content selector
    }, 2000); // Change the delay time as needed
  });
});

