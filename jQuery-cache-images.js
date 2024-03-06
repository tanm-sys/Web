!(function ($) {
  $.fn.cacheImages = function (options) {
    // Validate options argument
    if (typeof options !== 'object' || options === null) {
      console.error('FV.cacheImage: Error - Invalid options argument');
      return this;
    }

    const self = this; // Declare self as a constant

    // Initialize $.fn.cacheImagesConfig with default values
    this.cacheImagesConfig = $.extend({}, $.fn.cacheImages.defaults, options);

    // Validate $.fn.cacheImagesConfig object
    if (typeof this.cacheImagesConfig !== 'object' || this.cacheImagesConfig === null) {
      console.error('FV.cacheImage: Error - Invalid cacheImagesConfig object');
      return this;
    }

    // Validate debug property
    if (typeof this.cacheImagesConfig.debug !== 'boolean') {
      console.error('FV.cacheImage: Error - Invalid debug property');
      return this;
    }

    this.cacheImagesConfig.encodeOnCanvas =
      typeof HTMLCanvasElement !== 'undefined' && this.cacheImagesConfig.encodeOnCanvas;

    // Validate forceSave property
    this.cacheImagesConfig.forceSave =
      typeof this.cacheImagesConfig.forceSave === 'boolean'
        ? this.cacheImagesConfig.forceSave
        : false;

    // Validate start property
    if (typeof this.cacheImagesConfig.start === 'function') {
      this.cacheImagesConfig.start(this);
    }

    // Validate defaultImage property
    if (!$.fn.cacheImages.testOutput(this.cacheImagesConfig.defaultImage, true)) {
      this.cacheImagesConfig.defaultSrc = this.cacheImagesConfig.defaultImage;
    }

    this.each(function (index, element) {
      // Validate index and element arguments
      if (typeof index !== 'number' || element === null || typeof element !== 'object') {
        console.error('FV.cacheImage: Error - Invalid index or element arguments');
        return true;
      }

      $.fn.cacheImages.storageAvailable($(element), index, element, function (index, element) {
        const $element = $(element);
        let src;

        if ($element.prop('tagName') === 'IMG') {
          $element.data('cachedImageType', 'src');
          src = $element.prop('src') || $element.data('cachedImageSrc');

          // Validate src property
          if (typeof src !== 'string') {
            console.error('FV.cacheImage: Error - Invalid src property');
            return true;
          }

          if (self.cacheImagesConfig.url !== null) {
            src = self.cacheImagesConfig.url;
            $element.prop('src', '');
          }
        } else {
          $element.data('cachedImageType', 'css');
          src =
            $element.css('background-image').replace(/"/g, '').replace(/url\(|\)$/gi, '') ||
            $element.data('cachedImageSrc');

          // Validate src property
          if (typeof src !== 'string') {
            console.error('FV.cacheImage: Error - Invalid src property');
            return true;
          }

          if (self.cacheImagesConfig.url !== null) {
            src = self.cacheImagesConfig.url;
            $element.css('background-image', 'url()');
          }
        }

        // Validate src property
        if (src === undefined || typeof src !== 'string') {
          console.error('FV.cacheImage: Error - Invalid or missing URI to load');
          self.cacheImagesConfig.fail.call(this, 'Error - Invalid or missing URI to load');
          self.cacheImagesConfig.always.call(this);
          return true;
        }

        // Validate output property
        if (src !== undefined && $.fn.cacheImages.testOutput($element.prop('src'), true)) {
          console.log('FV.cacheImage: already displaying cached image');
          self.cacheImagesConfig.done.call(this);
          self.cacheImagesConfig.always.call(this);
          return true;
        }

        const storageKey = `${self.cacheImagesConfig.storagePrefix}:${src}`;

        $.fn.cacheImages.get($element, storageKey, function (key, cachedData) {
          if (
            self.cacheImagesConfig.forceSave === 0 &&
            cachedData &&
            $.fn.cacheImages.testOutput(cachedData, true)
          ) {
            this.data('cachedImageSrc', src);

            if (this.data('cachedImageType') === 'src') {
              this.prop('src', cachedData);
            } else {
              this.css('background-image', `url(${cachedData})`);
            }

            console.log('FV.cacheImage: Already Encoded');
            self.cacheImagesConfig.done.call(this, cachedData);
            self.cacheImagesConfig.always.call(this);
          } else if (cachedData === 'pending') {
            console.log(`FV.cacheImage: Caching in Progress - ${src}`);
            self.cacheImagesConfig.fail.call(this, 'Caching in Progress');
            self.cacheImagesConfig.always.call(this);
          } else {
            if (this.data('cachedImageType') === 'src') {
              this.prop('src', '');
            } else {
              this.css('background-image', 'url()');
            }

            const imageTypeMatch = src.match(/\.(jpg|jpeg|png|gif)$/i);
            let imageType;

            if (imageTypeMatch && imageTypeMatch.length) {
              imageType =
                imageTypeMatch[1].toLowerCase() === 'jpg' ? 'jpeg' : imageTypeMatch[1].toLowerCase();
            }

            // Validate imageType property
            if (imageType === undefined || typeof imageType !== 'string') {
              console.error('FV.cacheImage: Error - Unable to determine valid image type');
              self.cacheImagesConfig.fail.call(this, 'Error - Unable to determine valid image type');
              self.cacheImagesConfig.always.call(this);
              return;
            }

            this.data('cachedImageSrc', src);

            $.fn.cacheImages.set(this, storageKey, 'pending', function (key, data) {});

            if (self.cacheImagesConfig.encodeOnCanvas && imageType !== 'gif') {
              console.log(`FV.cacheImage: Preparing to Cache : canvas - ${src}`);

              $element.on('load', function () {
                const newSrc = $.fn.cacheImages.base64EncodeCanvas(this, imageType);
                $.fn.cacheImages.set(this, storageKey, newSrc);

                if ($.fn.cacheImages.testOutput(newSrc, true)) {
                  if (this.data('cachedImageType') === 'src') {
                    this.prop('src', newSrc);
                  } else {
                    this.css('background-image', `url(${newSrc})`);
                  }

                  if (this.is('.cacheImagesRemove')) {
                    this.remove();
                  }

                  self.cacheImagesConfig.done.call(this, newSrc);
                } else {
                  self.cacheImagesConfig.fail.call(this, 'Error - Unable to encode on canvas');
                }

                self.cacheImagesConfig.always.call(this);

                // Unbind the load event handler to prevent potential memory leaks
                $element.off('load');
              });
            } else {
              console.log(`FV.cacheImage: Preparing to Cache : base64 - ${src}`);
              $.fn.cacheImages.base64EncodeImg(this, function (newSrc) {
                $.fn.cacheImages.set(this, storageKey, newSrc, function () {
                  if (this.is('.cacheImagesRemove')) {
                    this.remove();
                  }

                  if (this.data('cachedImageType') === 'src') {
                    this.prop('src', newSrc);
                  } else {
                    this.css('background-image', `url(${newSrc})`);
                  }

                  self.cacheImagesConfig.done.call(this, newSrc);
                  self.cacheImagesConfig.always.call(this);
                });
              });
            }
          }
        });
      });
    });

    return this;
  };

  $.fn.cacheImages.defaults = {
    storagePrefix: 'FV-cacheImage',
    url: null,
    forceSave: false,
    defaultImage: null,
    encodeOnCanvas: false,
    done: function () {},
    fail: function () {},
    always: function () {},
    start: function () {},
    debug: false,
  };

  $.fn.cacheImages.storageAvailable = function ($element, index, element, callback) {
    // Validate $element argument
    if (!($element instanceof $) || $element.length === 0) {
      console.error('FV.cacheImage: Error - Invalid $element argument');
      return false;
    }

    callback(index, element);
  };

  $.fn.cacheImages.base64EncodeImg = function (element, callback) {
    const image = new Image();

    image.onload = function () {
      const canvas = document.createElement('CANVAS');
      const context = canvas.getContext('2d');
      canvas.height = image.height;
      canvas.width = image.width;
      context.drawImage(image, 0, 0);
      callback(canvas.toDataURL('image/png'));
    };

    // Add error handling for image loading
    image.onerror = function () {
      callback(null, 'Error - unable to load image');
    };

    // Validate element.src property
    if (typeof element.src !== 'string') {
      console.error('FV.cacheImage: Error - Invalid element.src property');
      return;
    }

    image.src = element.src;
  };

  $.fn.cacheImages.base64EncodeCanvas = function (element, imageType) {
    const canvas = document.createElement('CANVAS');
    const context = canvas.getContext('2d');
    canvas.height = element.height;
    canvas.width = element.width;
    context.drawImage(element, 0, 0);

    // Validate imageType property
    if (typeof imageType !== 'string') {
      console.error('FV.cacheImage: Error - Invalid imageType property');
      return null;
    }

    return canvas.toDataURL(`image/${imageType}`);
  };

  $.fn.cacheImages.testOutput = function (output, checkValue) {
    // Validate output argument
    if (typeof output !== 'string') {
      console.error('FV.cacheImage: Error - Invalid output argument');
      return false;
    }

    return output !== undefined && (checkValue !== true || output !== '');
  };

  $.fn.cacheImages.set = function (element, key, data, callback) {
    try {
      localStorage.setItem(key, data);
      console.log(`FV.cacheImage: Stored - ${key}`);
      callback(key, data);
    } catch (error) {
      console.error(`FV.cacheImage: Failed - ${key}`);
      callback(key, data);
    }
  };

  $.fn.cacheImages.get = function (element, key, callback) {
    try {
      const cachedData = localStorage.getItem(key);
      callback(key, cachedData !== null && cachedData);
    } catch (error) {
      console.error(`FV.cacheImage: Failed Retrieval - ${key}`);
      callback(key, false);
    }
  };
})(jQuery);
