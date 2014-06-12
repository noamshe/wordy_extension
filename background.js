/**
 * Created by noam on 05/06/14.
 */
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  showControls();
  if (request.method == "getStatus")
    sendResponse({status: localStorage['mark_words']});
  else if (request.method == "append_words")
    sendResponse({status: localStorage['append_words']});
  else
    sendResponse({});
})

