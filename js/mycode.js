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
    //url: "http://localhost:80/1.html",
    url: "http://ec2-54-201-117-105.us-west-2.compute.amazonaws.com/1.html",
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
        //replacement ="<a id='" + word + "' class='divid' href='javascript:void(0)' onClick='go2(this)' title='" + obj[word] + "' style='background:yellow; color: red; font-weight: bold'>" + word + "</a>";
        matchText(document.body, new RegExp("\\b" + word + "\\b", "g"), function(node, match, offset) {
            var span = document.createElement("span");
            span.className = "search-term";
            span.setAttribute('onclick', 'go2(this)');
            span.id = match;
            span.title = obj[match];
            span.textContent = match;
            node.parentNode.insertBefore(span, node.nextSibling);
        });
      }
    }

    addOnclickFunctionalityGlobally();
//    $('.divid').click(function(e) {
//      e.preventDefault();
//    });

    var elements = document.getElementsByClassName("search-term");
    $( elements ).tooltip({
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
    addGlobalStyle('.search-term {cursor: pointer; text-decoration: none !important;font-weight:bold;background-color:yellow}');
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

var matchText = function(node, regex, callback, excludeElements) {

    excludeElements || (excludeElements = ['script', 'style', 'iframe', 'cavas']);
    var child = node.firstChild;
    if (child == null)
      return;
    do {
        switch (child.nodeType) {
        case 1:
            if (excludeElements.indexOf(child.tagName.toLowerCase()) > -1) {
                continue;
            }
            matchText(child, regex, callback, excludeElements);
            break;
        case 3:
           child.data.replace(regex, function(all) {
                var args = [].slice.call(arguments),
                    offset = args[args.length - 2],
                    newTextNode = child.splitText(offset);
                newTextNode.data = newTextNode.data.substr(all.length);
                callback.apply(window, [child].concat(args));
                child = newTextNode;
            });
            break;
        }
    } while (child = child.nextSibling);
    return node;
}

//$.ajax({type: \"POST\", url: \"http://localhost:80/1.html\", data: \"{empid: id}\", dataType: \"text\"});
