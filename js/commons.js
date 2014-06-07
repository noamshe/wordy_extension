/**
 * Created by noam on 5/26/14.
 */

function getSelectionHtml() {
  var html = "";
  if (typeof window.getSelection != "undefined") {
    var sel = window.getSelection();
    if (sel.rangeCount) {
      var container = document.createElement("div");
      for (var i = 0, len = sel.rangeCount; i < len; ++i) {
        container.appendChild(sel.getRangeAt(i).cloneContents());
      }
      html = container.innerHTML;
    }
  } else if (typeof document.selection != "undefined") {
    if (document.selection.type == "Text") {
      html = document.selection.createRange().htmlText;
    }
  }
  return html;
}

function isHebrew(text) {
  return text.indexOf("א") != -1 || text.indexOf("ב") != -1
    || text.indexOf("ג") != -1 || text.indexOf("ד") != -1
    || text.indexOf("ה") != -1 || text.indexOf("ו") != -1
    || text.indexOf("ז") != -1 || text.indexOf("ח") != -1
    || text.indexOf("ט") != -1 || text.indexOf("י") != -1
    || text.indexOf("כ") != -1 || text.indexOf("ל") != -1
    || text.indexOf("מ") != -1 || text.indexOf("נ") != -1
    || text.indexOf("ס") != -1 || text.indexOf("ע") != -1
    || text.indexOf("פ") != -1 || text.indexOf("צ") != -1
    || text.indexOf("ק") != -1 || text.indexOf("ר") != -1
    || text.indexOf("ש") != -1 || text.indexOf("ת") != -1
    || text.indexOf("ף") != -1 || text.indexOf("ץ") != -1
    || text.indexOf("ן") != -1 || text.indexOf("ם") != -1
    || text.indexOf("ך") != -1;
}

function parseSelection(selection, func) {
  if (isHebrew(selection)) {
    console.log('hebrew');
    return parseWebDictionary("http://www.babylon.co.il/definition/" + selection + "/hebrew", selection, func);
  }
  else {
    console.log('english');
    return parseWebDictionary("http://www.morfix.co.il/" + selection, selection, func);
  }
}

function parseResultDocument(result, word) {
  var doc = document.implementation.createHTMLDocument (result, 'html',  null);
  doc.documentElement.innerHTML = result;
  //console.log(result);
  var elements;
  var msg = "";
  if (!isHebrew(word)) {
    elements = doc.getElementsByClassName("translation_he");
    msg = elements[0].innerHTML;
  } else {
    //msg = $(doc).find(".definition span").text();
    //elements = doc.getElementsByClassName("definition");
    elements = $(doc).find('.definition').filter(function(){ return $(this).text().indexOf('Wikipedia.org') == -1;}).filter(function(){ return this.id.indexOf('gaga_text') == -1;}).filter(function(){ return this.id.indexOf('gaga_div') == -1;});
    for (var i=0;i<elements.size();i++) {
      msg += elements[i].innerHTML.trim();
      msg += "<br>";
    }
  }

  return msg;
}

var resultFunction1 = function(result, word) {
  var msg = parseResultDocument(result, word);

  //alert(elements[0].innerHTML);
  //webkitNotifications.requestPermission();
  //var notification = webkitNotifications.createNotification(
  // 'note',  // icon url - can be relative
  //'',  // notification title
  //msg
  //);
  //notification.show();
  baloon.check();   // request permission: !!! Must be a user action callback, like click
  baloon.autocheck();    // request permission on first click anywhere on the document

  var notification = baloon({
    //title: "Title",
    message: msg,    // optional
    image: "/img/note.png",
    tag: "unique identifier",    // optional: prevent duplicates
    callback: function () {    // optional
      // do something on click
    },
    cancel: function () {    // optional
      // do something on close, unless clicked on (excluding X button)
    },
    timer: 1 // optional: ms to auto close
  });

  addWordToDB(word, msg, function(){});
}

function addWordToDB(word, definition, func) {
  chrome.runtime.sendMessage({method: "append_words"}, function (response) {
    console.log("save word to db: " + response.status);
    if (response.status == "true") {
      $.ajax({
        type: "POST",
        url: "http://ec2-54-201-117-105.us-west-2.compute.amazonaws.com/2.php",
        data: "word=" + word + "&def1=" + definition,
        dataType: "text",
        success: function() {
          func();
        }
      });
    }
  });
}

function parseWebDictionary(url, word, func) {
  var result1 = "";
  $.ajax({
    type: "POST",
    //url: "http://www.morfix.co.il/" + word,
    url: url,
    dataType: "text",
    success: function(result) {
      func(result, word)
    },
    error: function(){
      console.log("error parsing web");
    }
  });
  return result1;
}

function addGlobalStyle(css) {
  var head, style;
  head = document.getElementsByTagName('head')[0];
  if (!head) { return; }
  style = document.createElement('style');
  style.type = 'text/css';
  style.innerHTML = css;
  head.appendChild(style);
}
function addGlobalLink(href) {
  var head, style;
  head = document.getElementsByTagName('head')[0];
  if (!head) { return; }
  style = document.createElement('link');
  style.rel = "stylesheet";
  style.href = href;
  head.appendChild(style);
}
function addOnclickFunctionalityGlobally() {
  var head, style;
  head = document.getElementsByTagName('head')[0];
  if (!head) { return; }
  var script = document.createElement('script');
  script.setAttribute('type', 'text/javascript');
  script.text  = "function go2(elem){ elem.className=\"\"; window.postMessage({ type: \"FROM_PAGE\", text: elem.id}, \"*\");};"

  head.appendChild(script);
}

function saveChanges() {
    // Get a value saved in a form.
    var theValue = "noam shemesh";
    // Check that there's some code there.
    if (!theValue) {
        message('Error: No value specified');
        return;
    }
    // Save it using the Chrome extension storage API.
//    chrome.storage.local.set({'value': theValue}, function() {
        // Notify that we saved.
        //alert('Settings saved');
//    });
}
