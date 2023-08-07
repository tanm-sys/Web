   function isXMLHttpRequestLevel2Supported() {
      return 'XMLHttpRequest' in window && 'withCredentials' in new XMLHttpRequest();
    }

    function addXFrameOptionsHeaderXMLHttpRequest2(url) {
      $.ajax({
        type: "HEAD",
        url: url,
        success: function (data, textStatus, request) {
          var responseHeaders = request.getAllResponseHeaders();
          if (responseHeaders.indexOf("X-Frame-Options") === -1) {
            $.ajax({
              type: "POST",
              url: url,
              beforeSend: function (xhr) {
                xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                xhr.setRequestHeader("X-Frame-Options", "SAMEORIGIN");
              },
              success: function () {
                console.log("X-Frame-Options header added successfully.");
              },
              error: function (xhr, textStatus, errorThrown) {
                console.log("Error adding X-Frame-Options header:", errorThrown);
              }
            });
          }
        },
        error: function (xhr, textStatus, errorThrown) {
          console.log("Error fetching headers:", errorThrown);
        }
      });
    }

    function addXFrameOptionsHeaderXMLHttpRequest1(url) {
      $.ajax({
        type: "HEAD",
        url: url,
        beforeSend: function (xhr) {
          xhr.setRequestHeader("User-Agent", "XMLHTTP/1.0");
        },
        success: function (data, textStatus, request) {
          var responseHeaders = request.getAllResponseHeaders();
          if (responseHeaders.indexOf("X-Frame-Options") === -1) {
            $.ajax({
              type: "POST",
              url: url,
              beforeSend: function (xhr) {
                xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                xhr.setRequestHeader("X-Frame-Options", "SAMEORIGIN");
              },
              success: function () {
                console.log("X-Frame-Options header added successfully.");
              },
              error: function (xhr, textStatus, errorThrown) {
                console.log("Error adding X-Frame-Options header:", errorThrown);
              }
            });
          }
        },
        error: function (xhr, textStatus, errorThrown) {
          console.log("Error fetching headers:", errorThrown);
        }
      });
    }

    function addXFrameOptionsHeader(url) {
      if (isXMLHttpRequestLevel2Supported()) {
        addXFrameOptionsHeaderXMLHttpRequest2(url);
      } else {
        addXFrameOptionsHeaderXMLHttpRequest1(url);
      }
    }

    addXFrameOptionsHeader("http://anonhacker99.blogspot.com/"); 


