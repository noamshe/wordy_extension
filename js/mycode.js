$(document).ready(function(){

  $(document.body).dblclick(function() {
    parseSelection();
  });

  shortcut.add("Ctrl+Shift+X",function() {
    parseSelection();
  });

  function parseSelection() {
    var selection = getSelectionHtml();
    if (isHebrew(selection)) {
      console.log('hebrew');
      parseWebDictionary("http://www.babylon.co.il/definition/"+selection+"/hebrew");
    }
    else {
      console.log('english');
      parseWebDictionary("http://www.morfix.co.il/"+selection);
    }
  }

  $.ajax({
    type: "POST",
    url: "http://localhost:80/1.html",
    //data: "{empid: " + empid + "}",
    //contentType: "application/json; charset=utf-8",
    dataType: "text",
    success: function(result) {
      //console.log(result);
      setTimeout(function() {onLoadResult(result)}, 10);
    }
  });

  function onLoadResult(result) {

    /*
     var json = "[{\"conceded\":\"הוֹדָה, הִתְוַדָּה; וִתֵּר\"},{\"world\":\"456\"}, {\"elements\":\"יְסוֹד, אֶלֶמֶנְט; רְכִיב\"}, {\"daffodil\":\"נַרְקִיס\"}, {\"latitude\":\"קַו רֹחַב; רֹחַב גֵּאוֹגְרָפִי; חֹפֶשׁ פְּעֻלָּה, מֶרְחַב תִּמְרוּן\"}, {\"deportation\":\"גֵּרוּשׁ, הַגְלָיָה\"}, {\"chanting\":\"זִמֵּר, שָׁר (בעיקר תפילה או מזמור); קרא קריאות קצובות\"},{\"revelers\":\"חוֹגֵג, מי שמשתתף במסיבה המונית\"}, {\"equate\":\"הִשְׁוָה; הִתְאִים\"}, {\"jubilation\":\"שִׂמְחָה, עֲלִיצוּת, אֹשֶׁר\"}, {\"rigor\":\"חֻמְרָה, רְצִינוּת, הַקְפָּדָה\"},{\"longevity\":\"אֲרִיכוּת יָמִים, אֹרֶךְ יָמִים; אֲרִיכוּת\"}, {\"throngs\":\"קָהָל, צִבּוּר, הָמוֹן\"},{\"qaush\":\"לבטל (צו, החלטה); לדכא (התקוממות וכו')\"},{\"החלטה\":\"הכרעה, פסיקה, קביעה, בחירה, גמירת אומר, חריצת משפט\"}, {\"churning\":\"חִבֵּץ; עִרְבֵּל, הִקְצִיף, הִתְסִיס, נענע בחוזקה; זִעְזֵעַ\"},{\"jostled\":\"הִתְנַגֵּשׁ, נִכְנַס, דָּחַף\"},{\"stiltred\":\"(כשנאמר על סגנון) רִשְׁמִי, פוֹרְמָלִי; מְנֻפָּח, מְאֻלָּץ; רְהַבְתָּנִי; נֻקְשֶׁה; שמוגבה על קביים\"},{\"feudal\":\"(ימי הביניים) פֵאוֹדָלִי, שקשור לפיאודליזם\"}]";
     //var json = '[{"afternoon":"hello"}]';
     */

    console.log("Hello from Plugin :)");
    words = JSON.parse(result);
    console.log(words);
    var new_body = document.body.innerHTML;
    var replacement;
    for(var i = 0; i < words.length; i++) {
      var obj = words[i];
      //console.log(JSON.parse(response.responseText)[0]);
      for (var word in obj) {
        console.log(word);
        //new_body = new_body.replace(word, "<a href='' class='divid' title='" + obj[word] + "' style='background:yellow; color: red; font-weight: bold'>" + word + "</a>");
        //new_body = new_body.replace(word,"<a id='" + word + "' class='divid' href='javascript:void(0)' onClick='go2(this)' title='" + obj[word] + "' style='background:yellow; color: red; font-weight: bold'>" + word + "</a>");
        replacement ="<a id='" + word + "' class='divid' href='javascript:void(0)' onClick='go2(this)' title='" + obj[word] + "' style='background:yellow; color: red; font-weight: bold'>" + word + "</a>";
        //replaceText(word, replacement, document.body);
        var elems = $('* >:contains(' + word + ')');
        var elem = elems[elems.length-1];
        //console.log(elem);
        elem.innerHTML = elem.innerHTML.replace(word, replacement);
        //wrapWord(new_body, word);
      }
    }
    //document.body.innerHTML = new_body;
    addGlobalFunc();
    $('.divid').click(function(e) {
      e.preventDefault();
    });

    var elements = document.getElementsByClassName("divid");
    //$( document.getElementsById("divid") ).tooltip({
    $( elements ).tooltip({
      //$( document ).tooltip({
      position: {
        my: "center bottom-20",
        at: "center top",
        using: function( position, feedback ) {
          $( this ).css( position );
          $( "<div>" )
            .addClass( "arrow" )
            .addClass( feedback.vertical )
            .addClass( feedback.horizontal )
            .appendTo( this );
        }
      },
      hide: { effect: "explode", duration: 1000 }
      //content: function() {
      //	return "<input>1123</input>";
      //}
    });
  }

  setTimeout(function() {

    addGlobalLink('//code.jquery.com/ui/1.10.4/themes/smoothness/jquery-ui.css');
    //addGlobalLink('//resources/demos/style.css');
    addGlobalStyle('.ui-tooltip, .arrow:after {background: black;border: 2px solid white;}');
    addGlobalStyle('.ui-tooltip {padding: 10px 20px;color: white;border-radius: 20px;font: bold 14px "Helvetica Neue", Sans-Serif;text-transform: uppercase;box-shadow: 0 0 7px black;}');
    addGlobalStyle('.arrow {width: 70px;height: 16px;overflow: hidden;position: absolute;left: 50%;margin-left: -35px;bottom: -16px;}');
    addGlobalStyle('.arrow.top {top: -16px;bottom: auto;}');
    addGlobalStyle('.arrow.left {left: 20%;}');
    addGlobalStyle('.arrow:after {content: "";position: absolute;left: 20px;top: -20px;width: 25px;height: 25px;box-shadow: 6px 5px 9px -9px black;-webkit-transform: rotate(45deg);-moz-transform: rotate(45deg);-ms-transform: rotate(45deg);-o-transform: rotate(45deg);tranform: rotate(45deg);}');
    addGlobalStyle('.arrow.top:after {bottom: -20px;top: auto;}');
  }, 1);
});

chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.greeting === 'Load') {
    alert("got it");
    chrome.storage.local.get(null, function(storeObject) {
      sendResponse(newList);
    });
    return true;   // <-- I intend to call `sendResponse` later
  }
  return false;   // <-- I do NOT intend to call `sendResponse`
});
//var port = chrome.runtime.connect();

window.addEventListener("message", function(event) {
  // We only accept messages from ourselves
  if (event.source != window)
    return;

  if (event.data.type && (event.data.type == "FROM_PAGE")) {
    console.log("Content script received: " + event.data.text);
    webkitNotifications.requestPermission();
    var notification = webkitNotifications.createNotification(
      'note.png',  // icon url - can be relative
      'Hello!',  // notification title
      event.data.text+' was removed'// notification body text
    );
    notification.show();
    $.ajax({
      type: "POST",
      url: "http://localhost:80/1.html",
      //data: "{empid: " + empid + "}",
      //contentType: "application/json; charset=utf-8",
      dataType: "text",
      success: function(result) {
        //console.log(result);
        alert(result);
      }
    });
    //port.postMessage(event.data.text);
  }
}, false);

function replaceText(oldText, newText, node){
  node = node || document.body; // base node

  var childs = node.childNodes, i = 0;

  while(node = childs[i]){
    if (node.nodeType == 3){ // text node found, do the replacement
      if (node.textContent) {
        node.textContent = node.textContent.replace(oldText, newText);
        //node = node.innerHTML.replace(oldText, newText);
        //console.log(node.parentNode);
        //node.parentNode.innerHTML = node.parentNode.innerHTML.replace(oldText, newText);
      } else { // support to IE
        //node.nodeValue = node.nodeValue.replace(oldText, newText);
        //alert("bbooo");
      }
    } else { // not a text mode, look forward
      replaceText(oldText, newText, node);
    }
    i++;
  }
}


//$.ajax({type: \"POST\", url: \"http://localhost:80/1.html\", data: \"{empid: id}\", dataType: \"text\"});
