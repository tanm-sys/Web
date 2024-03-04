(function ($) {
  "use strict";

  const defaults = {
    src: "data-src",
    srcset: "data-srcset",
    selector: ".lazyload",
    root: null,
    rootMargin: "0px",
    threshold: 0,
  };

  const extend = function (options) {
    return $.extend({}, defaults, options || {});
  };

  function LazyLoad(images, options) {
    this.settings = extend(options);
    this.images = images || $(this.settings.selector);
    this.observer = null;
    this.init();
  }

  LazyLoad.prototype = {
    init: function () {
      /* Without observers load everything and bail out early. */
      if (!window.IntersectionObserver) {
        this.loadImages();
        return;
      }

      let self = this;
      let observerConfig = {
        root: this.settings.root,
        rootMargin: this.settings.rootMargin,
        threshold: [this.settings.threshold],
      };

      this.observer = new IntersectionObserver(function (entries) {
        $.each(entries, function (index, entry) {
          if (entry.isIntersecting) {
            self.observer.unobserve(entry.target);
            let data = $(entry.target).data();
            let src = data?.[self.settings.src];
            let srcset = data?.[self.settings.srcset];

            // Handle image or background image based on element type
            $(entry.target).is("img")
              ? $(entry.target).attr({ src, srcset })
              : $(entry.target).css("background-image", "url('" + src + "')");
          }
        });
      }, observerConfig);

      this.images.each(function (index, image) {
        self.observer.observe(image);
      });
    },

    loadAndDestroy: function () {
      if (!this.settings) return;
      this.loadImages();
      this.destroy();
    },

    loadImages: function () {
      if (!this.settings) return;

      let self = this;
      this.images.each(function (index, image) {
        let data = $(image).data();
        let src = data?.[self.settings.src];
        let srcset = data?.[self.settings.srcset];

        // Handle image or background image based on element type
        $(image).is("img")
          ? $(image).attr({ src, srcset })
          : $(entry.target).css("background-image", "url('" + src + "')");
      });
    },

    destroy: function () {
      if (!this.settings) return;
      this.observer.disconnect();
      this.settings = null;
    },
  };

  $.fn.lazyload = function (options) {
    options = options || {};
    options.attribute = options.attribute || "data-src";
    new LazyLoad(this, options);
    return this;
  };

  window.lazyload = $.fn.lazyload; // Add standalone function

})(jQuery);
