$(document).ready(function() {
    // Function to lazy load images
    function lazyLoadImages() {
        $('img[data-src]').each(function() {
            var image = $(this);
            var windowHeight = $(window).height();
            var windowScrollTop = $(window).scrollTop();
            var imageOffsetTop = image.offset().top;

            // Check if the image is within the visible threshold
            if (imageOffsetTop < (windowScrollTop + windowHeight * 1.2) && imageOffsetTop > windowScrollTop) {
                // Replace the placeholder with the appropriate image source from data-srcset
                image.attr('srcset', image.attr('data-srcset'));
                image.attr('src', image.attr('data-src'));

                // Add a smooth fade-in effect when the image loads
                image.hide().fadeIn();

                // Remove the data-src and data-srcset attributes to prevent re-loading
                image.removeAttr('data-src');
                image.removeAttr('data-srcset');
            }
        });

        // Lazy load background images
        $('.lazy-bg-image').each(function() {
            var element = $(this);
            var windowHeight = $(window).height();
            var windowScrollTop = $(window).scrollTop();
            var elementOffsetTop = element.offset().top;

            if (elementOffsetTop < (windowScrollTop + windowHeight * 1.2) && elementOffsetTop > windowScrollTop) {
                // Replace the background-image CSS property with the data-bg-src value
                element.css('background-image', 'url(' + element.attr('data-bg-src') + ')');

                // Remove the data-bg-src attribute to prevent re-loading
                element.removeAttr('data-bg-src');
            }
        });
    }

    // Show loading spinner while images are loading
    $(window).on('load', function() {
        $('.loading-spinner').hide();
    });

    // Call the lazyLoadImages function on page load
    lazyLoadImages();

    // Call the lazyLoadImages function on scroll
    $(window).on('scroll', function() {
        lazyLoadImages();
    });
});

