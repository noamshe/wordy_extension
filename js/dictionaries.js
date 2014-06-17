/**
 *
 * Created by noam on 14/06/14.
 */
var hebrewToHebrewObj =
{
  "id" : "dictionary_1",
  "info": "babylon",
  "align": "right",
  "title": "Hebrew",
  "url": "http://www.babylon.co.il/definition/$WORD$/hebrew",
  "parser": function(document) {
    var msg = "";
    var elements = $(document).find('.definition').filter(function(){ return $(this).text().indexOf('Wikipedia.org') == -1;}).filter(function(){ return this.id.indexOf('gaga_text') == -1;}).filter(function(){ return this.id.indexOf('gaga_div') == -1;});
    for (var i=0;i<elements.size();i++) {
      msg += elements[i].innerHTML.trim();
      msg += "<br>";
    }
    return msg;
  },
  "active" : ""
}
var englishToHebrewObj =
{
  "id" : "dictionary_2",
  "info": "morfix",
  "align": "right",
  "title": "Hebrew",
  "url":"http://www.morfix.co.il/$WORD$",
  "parser": function(document) {
    var elements = document.getElementsByClassName("translation_he");
    var msg = elements[0].innerHTML;
    return msg;
  },
  "active" : ""
};
var hebrewToEnglishObj =
{
  "id" : "dictionary_3",
  "info": "morfix",
  "align": "left",
  "title": "English",
  "url":"http://www.morfix.co.il/$WORD$",
  "parser": function(document) {
    var msg = "";
//    var elements = doc.getElementsByClassName("default_trans");
    var elements = $(document).find('.default_trans');
    for (var i=0;i<elements.size();i++) {
      msg += elements[i].innerHTML.trim();
      msg += "<br>";
    }
    return msg;
  },
  "active" : ""
};
var englishToSpanishObj =
{
  "id" : "dictionary_4",
  "info": "babylon",
  "align": "left",
  "title": "Spanish",
  "url": "http://www.babylon.co.il/definition/$WORD$/spanish",
  "parser": function(document) {
    var msg = "";
    var elements = $(document).find('.definition');
    var msg = elements[0].innerHTML;
    return msg;
  },
  "active" : ""
}
var englishToFrenchObj =
{
  "id" : "dictionary_5",
  "info": "babylon",
  "title": "French",
  "align": "left",
  "url": "http://www.babylon.co.il/definition/$WORD$/french",
  "parser": function(document) {
    var msg = "";
    var elements = $(document).find('.definition');
    var msg = elements[0].innerHTML;
    return msg;
  },
  "active" : ""
}
var englishToEnglishObj =
{
  "id" : "dictionary_6",
  "info": "oxforddictionaries",
  "title": "Oxford",
  "align": "left",
  "url": "http://www.oxforddictionaries.com/definition/english/$WORD$",
  "parser": function(document) {
    var iterations = $(document).find(".iteration").filter(function() {
      return $(this).text() === '1';
    });
    var msg = "";
    msg += '<p style="display: block">NOUN</p>';
    msg += $(iterations[0]).parent().find(".definition")[0].innerHTML;
    msg += '<p style="display: block">VERB</p>';
    msg += $(iterations[1]).parent().find(".definition")[0].innerHTML;
    return msg;
  },
  "active" : ""
}
var englishSynonymsObj =
{
  "id" : "dictionary_7",
  "info": "Merriam-webster",
  "title": "Merriam-webster Synonyms",
  "align": "left",
  "url": "http://www.merriam-webster.com/thesaurus/$WORD$",
  "parser": function(document) {
    var msg = "";
    msg += $(document).find("Strong:contains('Synonyms')").parent()[0].innerText;
    return msg;
  },
  "active" : ""
}
var hebrewSynonymsObj =
{
  "id" : "dictionary_8",
  "info": "Milog",
  "title": "מילים נרדפות",
  "align": "right",
  "url": "http://milog.co.il/$WORD$/s/%D7%A0%D7%A8%D7%93%D7%A4%D7%95%D7%AA",
  "parser": function(document) {
    var msg = "";
    msg += $(document).find(".sr_e_txt")[0].innerText;
    return msg;
  },
  "active" : ""
}

// INIT DICTIONARIES
var langObj =
{
  "page" :
  {
    "english": [englishToHebrewObj, englishToSpanishObj, englishToFrenchObj, englishToEnglishObj, englishSynonymsObj],
    "hebrew": [hebrewToEnglishObj, hebrewToHebrewObj, hebrewSynonymsObj]
  },
  "popup" :
  {
    "english": [englishToHebrewObj, englishToSpanishObj, englishToFrenchObj, englishToEnglishObj, englishSynonymsObj],
    "hebrew": [hebrewToEnglishObj, hebrewToHebrewObj, hebrewSynonymsObj]
  }
}
$(document).ready(function () {

  chrome.runtime.sendMessage({method: "dictionary_1"}, function (response) {
    hebrewToHebrewObj.active = response.status;
  });
  chrome.runtime.sendMessage({method: "dictionary_2"}, function (response) {
    englishToHebrewObj.active = response.status;
  });
  chrome.runtime.sendMessage({method: "dictionary_3"}, function (response) {
    hebrewToEnglishObj.active = response.status;
  });
  chrome.runtime.sendMessage({method: "dictionary_4"}, function (response) {
    englishToSpanishObj.active = response.status;
  });
  chrome.runtime.sendMessage({method: "dictionary_5"}, function (response) {
    englishToFrenchObj.active = response.status;
  });
  chrome.runtime.sendMessage({method: "dictionary_6"}, function (response) {
    englishToEnglishObj.active = response.status;
  });
  chrome.runtime.sendMessage({method: "dictionary_7"}, function (response) {
    englishSynonymsObj.active = response.status;
  });
  chrome.runtime.sendMessage({method: "dictionary_8"}, function (response) {
    hebrewSynonymsObj.active = response.status;
  });
});
