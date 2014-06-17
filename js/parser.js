/**
 * Created by noam on 14/06/14.
 */

function parseWebDictionary(url, word, func, translationObj) {
  var result1 = "";
  $.ajax({
    type: "POST",
    url: url, //"http://www.morfix.co.il/" + word
    dataType: "text",
    success: function(result) {
      func.output(result, word, translationObj)
    },
    error: function (data, textStatus, jqXHR) { console.log(textStatus); } // tbd add webkit message for error "something bad happend"
  });
  return result1;
}

function parseResultDocument(result, word, tranlationObj) {
  var doc = document.implementation.createHTMLDocument (result, 'html',  null);
  doc.documentElement.innerHTML = result;
  var msg = "";
  msg = tranlationObj.parser(doc);

  return msg;
}

function parseSelection(selection, output) {
  if (isHebrew(selection)) {
    arr = langObj[output.type].hebrew;
  } else {
    arr = langObj[output.type].english;
  }
  for (elem in arr) {
    var obj = arr[elem];
//    chrome.runtime.sendMessage({method: obj.id}, function (response) {
      if (obj.active == "true") {
        parseWebDictionary(obj.url.replace("$WORD$", selection), selection, output, obj);
      }
//    });
  }
}
