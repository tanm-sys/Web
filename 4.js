    function addXFrameOptionsHeader(url) {
      fetch(url, {
        method: 'HEAD',
        mode: 'no-cors'
      })
      .then(response => {
        var responseHeaders = response.headers;
        if (!responseHeaders.has("X-Frame-Options")) {
          fetch(url, {
            method: 'POST',
            mode: 'no-cors',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
              'X-Frame-Options': 'SAMEORIGIN'
            }
          })
          .then(() => {
            console.log("X-Frame-Options header added successfully.");
          })
          .catch(error => {
            console.log("Error adding X-Frame-Options header:", error);
          });
        }
      })
      .catch(error => {
        console.log("Error fetching headers:", error);
      });
    }

    // Call the function to add X-Frame-Options header
    addXFrameOptionsHeader("https://anonhacker99.blogspot.com/"); 

