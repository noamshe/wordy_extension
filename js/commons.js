/**
 * Created by noam on 5/26/14.
 */

function wrapWord(el, word)
{
  var expr = new RegExp(word, "i");
  var nodes = [].slice.call(el.childNodes, 0);
  for (var i = 0; i < nodes.length; i++)
  {
    var node = nodes[i];
    if (node.nodeType == 3) // textNode
    {
      var matches = node.nodeValue.match(expr);
      if (matches)
      {
        var parts = node.nodeValue.split(expr);
        for (var n = 0; n < parts.length; n++)
        {
          if (n)
          {
            var span = el.insertBefore(document.createElement("span"), node);
            span.appendChild(document.createTextNode(matches[n - 1]));
          }
          if (parts[n])
          {
            el.insertBefore(document.createTextNode(parts[n]), node);
          }
        }
        el.removeChild(node);
      }
    }
    else
    {
      wrapWord(node, word);
    }
  }
}

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

function parseWebDictionary(url) {
  var word = getSelectionHtml();
  $.ajax({
    type: "POST",
    //url: "http://www.morfix.co.il/" + word,
    url: url,
    //data: "{empid: " + empid + "}",
    //contentType: "application/json; charset=utf-8",
    dataType: "text",
    success: function(result) {
      var doc = document.implementation.createHTMLDocument (result, 'html',  null);
      doc.documentElement.innerHTML = result;
      //console.log(result);
      var elements;
      var msg;
      if (!isHebrew(word)) {
        elements = doc.getElementsByClassName("translation_he");
        msg = elements[0].innerHTML;
      } else {
        elements = doc.getElementsByClassName("definition");
        msg = $(doc).find(".definition span").text();
      }
      //alert(elements[0].innerHTML);
      webkitNotifications.requestPermission();
      var notification = webkitNotifications.createNotification(
        'note',  // icon url - can be relative
        '',  // notification title
        msg
      );
      notification.show();
    }
  });
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
function addGlobalFunc(scrpt) {
  var head, style;
  head = document.getElementsByTagName('head')[0];
  if (!head) { return; }
  var script = document.createElement('script');
  script.setAttribute('type', 'text/javascript');
  //script.text  = "alert('voila!');"
  script.text  = "function go2(elem){ elem.className=\"\"; window.postMessage({ type: \"FROM_PAGE\", text: elem.id}, \"*\");};"
  //script.text  = "function go2(elem){ alert(elem.id) };"
  //script.text  = "function go2(){ $.ajax({type: \"POST\", url: \"http://localhost:80/1.html\", data: \"{empid: id}\", dataType: \"text\"});alert('Hello from inserted script.') };"

  head.appendChild(script);
}
