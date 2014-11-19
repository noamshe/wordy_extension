/**
 * Created by noam on 05/06/14.
 */
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
//  showControls();
  if (request.method == "getStatus")
    sendResponse({status: localStorage['mark_words']});
  else if (request.method == "append_words")
    sendResponse({status: localStorage['append_words']});
  else if (request.method == "dictionary_1_popup")
    sendResponse({status: localStorage['dictionary_1_popup']});
  else if (request.method == "dictionary_2_popup")
    sendResponse({status: localStorage['dictionary_2_popup']});
  else if (request.method == "dictionary_3_popup")
    sendResponse({status: localStorage['dictionary_3_popup']});
  else if (request.method == "dictionary_4_popup")
    sendResponse({status: localStorage['dictionary_4']});
  else if (request.method == "dictionary_5_popup")
    sendResponse({status: localStorage['dictionary_5_popup']});
  else if (request.method == "dictionary_6_popup")
    sendResponse({status: localStorage['dictionary_6_popup']});
  else if (request.method == "dictionary_7_popup")
    sendResponse({status: localStorage['dictionary_7_popup']});
  else if (request.method == "dictionary_8_popup")
    sendResponse({status: localStorage['dictionary_8_popup']});
  else if (request.method == "dictionary_1_page")
    sendResponse({status: localStorage['dictionary_1_page']});
  else if (request.method == "dictionary_2_page")
    sendResponse({status: localStorage['dictionary_2_page']});
  else if (request.method == "dictionary_3_page")
    sendResponse({status: localStorage['dictionary_3_page']});
  else if (request.method == "dictionary_4_page")
    sendResponse({status: localStorage['dictionary_4_page']});
  else if (request.method == "dictionary_5_page")
    sendResponse({status: localStorage['dictionary_5_page']});
  else if (request.method == "dictionary_6_page")
    sendResponse({status: localStorage['dictionary_6_page']});
  else if (request.method == "dictionary_7_page")
    sendResponse({status: localStorage['dictionary_7_page']});
  else if (request.method == "dictionary_8_page")
    sendResponse({status: localStorage['dictionary_8_page']});
  else if (request.method == "getTheme")
    sendResponse({theme_name: localStorage['activated_theme'], theme_id: localStorage['activated_theme_id']});
  else
    sendResponse({});
})

