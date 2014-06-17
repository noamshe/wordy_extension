/**
 * Created by noam on 05/06/14.
 */
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
//  showControls();
  if (request.method == "getStatus")
    sendResponse({status: localStorage['mark_words']});
  else if (request.method == "append_words")
    sendResponse({status: localStorage['append_words']});
  else if (request.method == "dictionary_1")
    sendResponse({status: localStorage['dictionary_1']});
  else if (request.method == "dictionary_2")
    sendResponse({status: localStorage['dictionary_2']});
  else if (request.method == "dictionary_3")
    sendResponse({status: localStorage['dictionary_3']});
  else if (request.method == "dictionary_4")
    sendResponse({status: localStorage['dictionary_4']});
  else if (request.method == "dictionary_5")
    sendResponse({status: localStorage['dictionary_5']});
  else if (request.method == "dictionary_6")
    sendResponse({status: localStorage['dictionary_6']});
  else if (request.method == "dictionary_7")
    sendResponse({status: localStorage['dictionary_7']});
  else if (request.method == "dictionary_8")
    sendResponse({status: localStorage['dictionary_8']});
  else
    sendResponse({});
})

