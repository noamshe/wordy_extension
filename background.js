/**
 * Created by noam on 05/06/14.
 */
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.method == "getStatus")
    sendResponse({status: localStorage['mark_words']});
  else
    sendResponse({}); // snub them.
});