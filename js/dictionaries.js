/**
 *
 * Created by noam on 14/06/14.
 */
var hebrewToHebrewObj =
{
  "info": "babylon",
  "align": "right",
  "url": "http://www.babylon.co.il/definition/$WORD$/hebrew",
  "parser": function(document) {
    var msg = "";
    var elements = $(document).find('.definition').filter(function(){ return $(this).text().indexOf('Wikipedia.org') == -1;}).filter(function(){ return this.id.indexOf('gaga_text') == -1;}).filter(function(){ return this.id.indexOf('gaga_div') == -1;});
    for (var i=0;i<elements.size();i++) {
      msg += elements[i].innerHTML.trim();
      msg += "<br>";
    }
    return msg;
  }
}
var englishToHebrewObj =
{
  "info": "morfix",
  "align": "right",
  "url":"http://www.morfix.co.il/$WORD$",
  "parser": function(document) {
    var elements = document.getElementsByClassName("translation_he");
    var msg = elements[0].innerHTML;
    return msg;
  }
};
var hebrewToEnglishObj =
{
  "info": "morfix",
  "align": "left",
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
  }
};

var langObj =
{
  "english": [englishToHebrewObj],
  "hebrew": [hebrewToEnglishObj]
}
