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
  "active_popup" : "",
  "active_page" : ""
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
  "active_popup" : "true",
  "active_page" : "true"
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
    var elements = $(document).find('.default_trans');
    for (var i=0;i<elements.size();i++) {
      msg += elements[i].innerHTML.trim();
      msg += "<br>";
    }
    return msg;
  },
  "active_popup" : "true",
  "active_page" : "true"
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
  "active_popup" : "",
  "active_page" : ""
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
  "active_popup" : "",
  "active_page" : ""
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
  "active_popup" : "",
  "active_page" : ""
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
  "active_popup" : "",
  "active_page" : ""
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
  "active_popup" : "",
  "active_page" : ""
}
var spanishToHebrew =
{
  "id" : "dictionary_9",
  "info": "babylon",
  "title": "hebrew",
  "align": "right",
  "url": "http://www.babylon.co.il/definition/$WORD$/hebrew",
  "parser": function(document) {
    var msg = "";
    msg += $(document).find(".term").next()[0].innerText;
    return msg;
  },
  "active_popup" : "true",
  "active_page" : "true"
}

$(document).ready(function () {

  chrome.runtime.sendMessage({method: "dictionary_1_popup"}, function (response) {
    hebrewToHebrewObj.active_popup = response.status;
  });
  chrome.runtime.sendMessage({method: "dictionary_2_popup"}, function (response) {
    englishToHebrewObj.active_popup = response.status;
  });
  chrome.runtime.sendMessage({method: "dictionary_3_popup"}, function (response) {
    hebrewToEnglishObj.active_popup = response.status;
  });
  chrome.runtime.sendMessage({method: "dictionary_4_popup"}, function (response) {
    englishToSpanishObj.active_popup = response.status;
  });
  chrome.runtime.sendMessage({method: "dictionary_5_popup"}, function (response) {
    englishToFrenchObj.active_popup = response.status;
  });
  chrome.runtime.sendMessage({method: "dictionary_6_popup"}, function (response) {
    englishToEnglishObj.active_popup = response.status;
  });
  chrome.runtime.sendMessage({method: "dictionary_7_popup"}, function (response) {
    englishSynonymsObj.active_popup = response.status;
  });
  chrome.runtime.sendMessage({method: "dictionary_8_popup"}, function (response) {
    hebrewSynonymsObj.active_popup = response.status;
  });

  chrome.runtime.sendMessage({method: "dictionary_1_page"}, function (response) {
    hebrewToHebrewObj.active_page = response.status;
  });
  chrome.runtime.sendMessage({method: "dictionary_2_page"}, function (response) {
    englishToHebrewObj.active_page= response.status;
  });
  chrome.runtime.sendMessage({method: "dictionary_3_page"}, function (response) {
    hebrewToEnglishObj.active_page= response.status;
  });
  chrome.runtime.sendMessage({method: "dictionary_4_page"}, function (response) {
    englishToSpanishObj.active_page= response.status;
  });
  chrome.runtime.sendMessage({method: "dictionary_5_page"}, function (response) {
    englishToFrenchObj.active_page= response.status;
  });
  chrome.runtime.sendMessage({method: "dictionary_6_page"}, function (response) {
    englishToEnglishObj.active_page= response.status;
  });
  chrome.runtime.sendMessage({method: "dictionary_7_page"}, function (response) {
    englishSynonymsObj.active_page= response.status;
  });
  chrome.runtime.sendMessage({method: "dictionary_8_page"}, function (response) {
    hebrewSynonymsObj.active_page= response.status;
  });
});

// INIT DICTIONARIES
var langObj =
{
  "page" :
  {
    "english": [englishToHebrewObj, englishToSpanishObj, englishToFrenchObj, englishToEnglishObj, englishSynonymsObj],
    "hebrew": [hebrewToEnglishObj, hebrewToHebrewObj, hebrewSynonymsObj],
    "spanish": [spanishToHebrew]
  },
  "popup" :
  {
    "english": [englishToHebrewObj, englishToSpanishObj, englishToFrenchObj, englishToEnglishObj, englishSynonymsObj],
    "hebrew": [hebrewToEnglishObj, hebrewToHebrewObj, hebrewSynonymsObj],
    "spanish": [spanishToHebrew]
  }
}
