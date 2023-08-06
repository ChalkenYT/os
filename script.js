    window.onload = function() {
      var bingLogo = document.querySelector(".bing");
      var nowggLogo = document.querySelector(".docs");
      var youtubeLogo = document.querySelector(".youtube");
      var powerbutton = document.querySelector(".power");
      var chatgpt = document.querySelector(".chatgpt")
      var helpbutton = document.querySelector(".help")
      var iframeContainer = null;
      var iframe = null;
      var isResizing = false;
      var width = 400;
      var height = 300;

      powerbutton.addEventListener("click", function() {
        window.close();
        
        console.log("Start");
        setTimeout(function() {
          console.log("Pause for 2 seconds");
          alert("Your browser may have prevented the page from closing. Please manually close the tab.")
        }, 2000);
        console.log("End");
      });

      chatgpt.addEventListener("click", function() {
        openIframe("https://huggingface.co/chat/");
      });
      helpbutton.addEventListener("click", function() {
        openIframe("https://os.chalken.repl.co/help.html");
      });
      bingLogo.addEventListener("click", function() {
        openIframe("https://www.bing.com");
      });

      nowggLogo.addEventListener("click", function() {
        openIframe("https://www.notepad-online.net/");
      });

      youtubeLogo.addEventListener("click", function() {
        showSearchPrompt();
      });

      function openIframe(url) {
        if (iframeContainer) {
          return;
        }

        iframeContainer = document.createElement("div");
        iframeContainer.classList.add("iframe-container");
        iframeContainer.style.width = width + "px";
        iframeContainer.style.height = height + "px";

        iframe = document.createElement("iframe");
        iframe.src = url;
        iframe.frameBorder = "0";
        iframeContainer.appendChild(iframe);

        var closeButton = document.createElement("div");
        closeButton.classList.add("close-button");
        closeButton.textContent = "X";
        iframeContainer.appendChild(closeButton);

        var resizer = document.createElement("div");
        resizer.classList.add("resizer");
        iframeContainer.appendChild(resizer);

        document.body.appendChild(iframeContainer);

        closeButton.addEventListener("click", function() {
          closeIframe();
        });

        resizer.addEventListener("mousedown", function(e) {
          isResizing = true;
          offsetX = e.clientX - width;
          offsetY = e.clientY - height;
        });

        window.addEventListener("mousemove", function(e) {
          if (isResizing) {
            width = e.clientX - iframeContainer.offsetLeft + offsetX;
            height = e.clientY - iframeContainer.offsetTop + offsetY;
            iframeContainer.style.width = width + "px";
            iframeContainer.style.height = height + "px";
          }
        });

        window.addEventListener("mouseup", function() {
          isResizing = false;
        });
      }

      function closeIframe() {
        if (iframeContainer) {
          document.body.removeChild(iframeContainer);
          iframeContainer = null;
        }
      }

      function showSearchPrompt() {
        var promptContainer = document.createElement("div");
        promptContainer.classList.add("search-prompt");

        var searchInput = document.createElement("input");
        searchInput.setAttribute("type", "text");
        searchInput.setAttribute("placeholder", "Search on YouTube");
        promptContainer.appendChild(searchInput);

        var searchButton = document.createElement("button");
        searchButton.textContent = "Search";
        promptContainer.appendChild(searchButton);

        document.body.appendChild(promptContainer);

        searchButton.addEventListener("click", function() {
          var searchTerm = searchInput.value.trim();
          if (searchTerm !== "") {
            searchOnYouTube(searchTerm);
          }
        });
      }

      function searchOnYouTube(searchTerm) {
        var apiUrl = "https://www.googleapis.com/youtube/v3/search";
        var apiKey = "AIzaSyCHgUucUTRCBJOzz4OZFs5i1E43_ZkT5LQ";
        var requestData = {
          q: searchTerm,
          part: "snippet",
          maxResults: 1,
          type: "video",
          key: apiKey
        };

        $.get(apiUrl, requestData, function(data) {
          if (data.items.length > 0) {
            var videoId = data.items[0].id.videoId;
            var videoUrl = "https://www.youtube.com/embed/" + videoId;
            openIframe(videoUrl);
          }
        });

        closeSearchPrompt();
      }

      function closeSearchPrompt() {
        var promptContainer = document.querySelector(".search-prompt");
        if (promptContainer) {
          document.body.removeChild(promptContainer);
        }
      }
    };
