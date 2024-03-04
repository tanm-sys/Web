!(function ($) {
  $.fn.cacheImages = function (options) {
    this.cacheImagesConfig = $.extend({}, $.fn.cacheImages.defaults, options);
    this.cacheImagesConfig.encodeOnCanvas =
      typeof HTMLCanvasElement !== 'undefined' && this.cacheImagesConfig.encodeOnCanvas;
    this.cacheImagesConfig.forceSave = typeof this.cacheImagesConfig.forceSave === 'boolean' ? this.cacheImagesConfig.forceSave : false;

    const self = this;

    if (typeof this.cacheImagesConfig.start === 'function') {
      this.cacheImagesConfig.start(this);
    }

    if (!$.fn.cacheImages.testOutput(this.cacheImagesConfig.defaultImage, true)) {
      this.cacheImagesConfig.defaultSrc = this.cacheImagesConfig.defaultImage;
    }

    this.each(function (index, element) {
      $.fn.cacheImages.storageAvailable($(element), index, element, function (index, element) {
        const $element = $(element);
        let src;
        if ($element.prop('tagName') === 'IMG') {
          $element.data('cachedImageType', 'src');
          src = $element.prop('src') || $element.data('cachedImageSrc');
          if (self.cacheImagesConfig.url !== null) {
            src = self.cacheImagesConfig.url;
            $element.prop('src', '');
          }
        } else {
          $element.data('cachedImageType', 'css');
          src = $element.css('background-image').replace(/"/g, '').replace(/url\(|\)$/gi, '') || $element.data('cachedImageSrc');
          if (self.cacheImagesConfig.url !== null) {
            src = self.cacheImagesConfig.url;
            $element.css('background-image', 'url()');
          }
        }

        if (src === undefined) {
          console.error('FV.cacheImage: Error - no URI to load');
          self.cacheImagesConfig.fail.call(this);
          self.cacheImagesConfig.always.call(this);
          return true;
        }

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
            self.cacheImagesConfig.fail.call(this);
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
              imageType = imageTypeMatch[1].toLowerCase() === 'jpg' ? 'jpeg' : imageTypeMatch[1].toLowerCase();
            }
            if (imageType === undefined) {
              self.cacheImagesConfig.fail.call(this);
              self.cacheImagesConfig.always.call(this);
              return;
            }
            this.data('cachedImageSrc', src);
            $.fn.cacheImages.set(this, storageKey, 'pending', function (key, data) {});
            if (self.cacheImagesConfig.encodeOnCanvas && imageType !== 'gif') {
              console.log(`FV.cacheImage: Preparing to Cache : canvas - ${src}`);
              $element.on('load', function () {
                const newSrc = $.fn.cacheImages.base64EncodeCanvas(this);
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
                  self.cacheImagesConfig.fail.call(this);
                }
                self.cacheImagesConfig.always.call(this);
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
    }

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
    if (typeof localStorage === 'undefined') {
      console.error('FV.cacheImage: Error - No Storage Support');
      $.fn.cacheImages.defaults.fail.call(this, 'FV.cacheImage: Error - No Storage Support');
      $.fn.cacheImages.defaults.always.call(this);
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
    image.src = element.src;
  };

  $.fn.cacheImages.base64EncodeCanvas = function (element) {
    const canvas = document.createElement('CANVAS');
    const context = canvas.getContext('2d');
    canvas.height = element.height;
    canvas.width = element.width;
    context.drawImage(element, 0, 0);
    return canvas.toDataURL('image/png');
 

 };

  $.fn.cacheImages.testOutput = function (output, checkValue) {
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
