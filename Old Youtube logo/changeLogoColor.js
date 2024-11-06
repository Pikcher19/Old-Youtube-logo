  // Function to observe mutations in the document
  function observeLogo() {
    // Options for the observer (which mutations to observe)
    var config = { attributes: true, childList: true, subtree: true };
  
    // Callback function to execute when mutations are observed
    var callback = function(mutationsList, observer) {
      // Use traditional 'for loops' for IE 11
      for(var mutation of mutationsList) {
        if (changeLogoColor()) {
          // If the logo color was changed, no need to observe anymore
          observer.disconnect();
          break;
        }
      }
    };
  
    // Create an observer instance linked to the callback function
    var observer = new MutationObserver(callback);
  
    // Start observing the document for configured mutations
    observer.observe(document, config);
  }
    
// Function to change the favicon
function changeFavicon() {
  // Define your new favicon urls
  const newFaviconURL = chrome.runtime.getURL("images/icon.png");
  const newFavicon32x32URL = chrome.runtime.getURL("images/icon_32x32.png");
  const newFavicon96x96URL = chrome.runtime.getURL("images/icon_96x96.png");
  const newFavicon128x128URL = chrome.runtime.getURL("images/icon_128x128.png");
  // Find and replace each favicon link
  const links = document.querySelectorAll('link[rel*="icon"]');
  for(let link of links) {
    if(link.sizes.contains('32x32')) {
      link.href = newFavicon32x32URL;
    } else if(link.sizes.contains('48x48')) {
      link.href = newFavicon48x48URL;
    } else if(link.sizes.contains('96x96')) {
      link.href = newFavicon96x96URL;
    } else if(link.sizes.contains('128x128')) {
      link.href = newFavicon128x128URL;
    } else {
      // Default to the standard favicon for any unspecified sizes
      link.href = newFaviconURL;
    }
  }
}
// Call the function to change the favicon
changeFavicon();