/**
 * Created by noam on 14/06/14.
 */
function detectLanguage(url, word, func, translationObj) {
  var result1 = "";
  $.ajax({
    type: "POST",
    url: "https://translate.google.com/#auto/iw/" + word,
    dataType: "text",
    success: function(result) {
      var doc = document.implementation.createHTMLDocument (result, 'html',  null);
      doc.documentElement.innerHTML = result;
      var detected_language = $(doc).find("div [value='auto']").innerText;
    },
    error: function (data, textStatus, jqXHR) { console.log("could not detect language"); }
  });
  return result1;
}

function parseWebDictionary(url, word, func, translationObj) {
  var result1 = "";
  $.ajax({
    type: "POST",
    url: url, //"http://www.morfix.co.il/" + word
    dataType: "text",
    success: function(result) {
      func.output(result, word, translationObj)
    },
    error: function (data, textStatus, jqXHR) { console.log(textStatus); } // tbd add webkit message for error "something bad happened"
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
    if (obj["active_" + output.type] == "true") {
      parseWebDictionary(obj.url.replace("$WORD$", selection), selection, output, obj);
    }
  }
}

// detect language trial
/*
function parseSelection(selection, output) {
  $.ajax({
    type: "POST",
    url: LANGUAGE_DETECT_URL + selection,
    dataType: "text",
    success: function(result) {
      var detected_language = result.substr(result.indexOf("\"") + 1, 2);
      console.log(detected_language);
      if (detected_language == "iw") {
        arr = langObj[output.type].hebrew;
      } else if (detected_language == "en") {
        arr = langObj[output.type].english;
      } else if (detected_language == "es" || detected_language == "fr") {
        arr = langObj[output.type].spanish;
      } else {
        console.log("could not detect language: " + detected_language);
        if (isHebrew(selection)) {
          arr = langObj[output.type].hebrew;
        } else {
          arr = langObj[output.type].english;
        }
      }
      for (elem in arr) {
        var obj = arr[elem];
        if (obj["active_" + output.type] == "true") {
          parseWebDictionary(obj.url.replace("$WORD$", selection), selection, output, obj);
        }
      }
    },
    error: function (data, textStatus, jqXHR) { console.log("could not detect language"); }
  });
}
*/
