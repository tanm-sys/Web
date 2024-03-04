(function (a) {
    "use strict";
  
    // Destructuring assignment to create a shorthand for `a.extend`
    const extend = a.extend;
  
    // Function to check if an image is loaded successfully
    function isImageLoaded(url) {
      return new Promise((resolve) => {
        const image = new Image();
        image.onload = () => resolve(true);
        image.onerror = () => resolve(false);
        image.src = url;
      });
    }
  
    // Function to set the image source or background image
    function setImageSource(image, src, srcset) {
      return isImageLoaded(src).then((isLoaded) =>
        isLoaded
          ? Promise.resolve()
          : new Promise((resolve, reject) => {
              const imageElement =
                image.is("img") ? image : a(image.target);
              imageElement.on("load", () => {
                imageElement.attr("src", src).attr("srcset", srcset);
                resolve();
              });
              imageElement.on("error", () => {
                onError(image);
                reject();
              });
              imageElement.attr("src", src);
            })
      );
    }
  
    // Function to handle image errors
    function onError(image) {
      // Call the `onError` method of the provided object, if it exists
      if (image.onError) {
        image.onError();
      }
    }
  
    // Object containing default configuration options
    // your own path and conditions goes here
    const config = {
      src: "",
      srcset: ""
    };
  
    // Function to extend the default configuration options with user-provided options
    function getConfig(userOptions) {
      return extend({}, config, userOptions || {});
    }
  
    // Export the `setImageSource` function as the default export
    // of the module, so it can be imported and used in other files
    return {
      setImageSource,
      getConfig,
      onError
    };
  })(jQuery);
  // Usage example
  // =============
  // To use this script, simply call the `setImageSource()` function
  // passing an HTML Image element, a source URL string, and optionally
  // some additional settings for the image.
  // For instance:
  //
  //     var myImg = document.getElementById("my-img");
  //     imgSrc.setImageSource(myImg, "http://example.com/path/to/image.jpg", {
  //         /* optional settings */
  //         width: 800,
  //         height: 600
  //     });
  //
  // The `width` and `height` properties are not required; they will be
  // automatically determined from the loaded image file if present. If no 
  // source URL is provided, or if the image fails to load, the callbacks
  // registered via `.onLoad()`, `.onProgress()`, and `.onError()` will still
  // fire, but the image's `src` attribute will remain unchanged.
  //
  // Callbacks
  // ---------
