
$(document).ready(function () {

  $(document.body).dblclick(function () {
    var selection = getSelectionHtml();
    parseSelection(selection, inPageOutput);
  });

  shortcut.add(MARK_SHORT_CUT, function () {
  //  shortcut.add("Ctrl+Shift+Q", function () {
    var selection = getSelectionHtml();
    parseSelection(selection, inPageOutput);
  });

  var inPageOutput = function(result, word, translationObj) {
    var msg = parseResultDocument(result, word, translationObj);
    showControls(msg);
    addWordToDB(word, msg, function(){});
  }

  chrome.runtime.sendMessage({method: "getStatus"}, function (response) {
    console.log(response.status);
    if (response.status == "true") {
      $.ajax({
        type: "POST",
        //url: "http://localhost:80/1.html",
        url: "http://ec2-54-201-117-105.us-west-2.compute.amazonaws.com/1.php",
        //data: "{empid: " + empid + "}",
        //contentType: "application/json; charset=utf-8",
        dataType: "text",
        success: function (result) {
          //console.log(result);
          setTimeout(function () {
            onLoadResult(result)
          }, 10);
        }
      });
    }
  });

//    alert(localStorage['builds_option']);

  function onLoadResult(result) {
    // localStorage["noam"] = "shemesh";
//      saveChanges();

    /*
     var json = "[{\"conceded\":\"הוֹדָה, הִתְוַדָּה; וִתֵּר\"},{\"world\":\"456\"}, {\"elements\":\"יְסוֹד, אֶלֶמֶנְט; רְכִיב\"}, {\"daffodil\":\"נַרְקִיס\"}, {\"latitude\":\"קַו רֹחַב; רֹחַב גֵּאוֹגְרָפִי; חֹפֶשׁ פְּעֻלָּה, מֶרְחַב תִּמְרוּן\"}, {\"deportation\":\"גֵּרוּשׁ, הַגְלָיָה\"}, {\"chanting\":\"זִמֵּר, שָׁר (בעיקר תפילה או מזמור); קרא קריאות קצובות\"},{\"revelers\":\"חוֹגֵג, מי שמשתתף במסיבה המונית\"}, {\"equate\":\"הִשְׁוָה; הִתְאִים\"}, {\"jubilation\":\"שִׂמְחָה, עֲלִיצוּת, אֹשֶׁר\"}, {\"rigor\":\"חֻמְרָה, רְצִינוּת, הַקְפָּדָה\"},{\"longevity\":\"אֲרִיכוּת יָמִים, אֹרֶךְ יָמִים; אֲרִיכוּת\"}, {\"throngs\":\"קָהָל, צִבּוּר, הָמוֹן\"},{\"qaush\":\"לבטל (צו, החלטה); לדכא (התקוממות וכו')\"},{\"החלטה\":\"הכרעה, פסיקה, קביעה, בחירה, גמירת אומר, חריצת משפט\"}, {\"churning\":\"חִבֵּץ; עִרְבֵּל, הִקְצִיף, הִתְסִיס, נענע בחוזקה; זִעְזֵעַ\"},{\"jostled\":\"הִתְנַגֵּשׁ, נִכְנַס, דָּחַף\"},{\"stiltred\":\"(כשנאמר על סגנון) רִשְׁמִי, פוֹרְמָלִי; מְנֻפָּח, מְאֻלָּץ; רְהַבְתָּנִי; נֻקְשֶׁה; שמוגבה על קביים\"},{\"feudal\":\"(ימי הביניים) פֵאוֹדָלִי, שקשור לפיאודליזם\"}]";
     //var json = '[{"afternoon":"hello"}]';
     */

    console.log("Hello from Plugin :)");
    words = JSON.parse(result);
    console.log(words);
    var new_body = document.body.innerHTML;
    var replacement;
    for (var i = 0; i < words.length; i++) {
      var obj = words[i];
      //console.log(JSON.parse(response.responseText)[0]);
      for (var word in obj) {
        console.log(word);
        //replacement ="<a id='" + word + "' class='divid' href='javascript:void(0)' onClick='go2(this)' title='" + obj[word] + "' style='background:yellow; color: red; font-weight: bold'>" + word + "</a>";
        matchText(document.body, new RegExp("\\b" + word + "\\b", "g"), function (node, match, offset) {
          var span = document.createElement("span");
          span.className = "search-term";
          span.setAttribute('onclick', 'go2(this)');
          span.id = match;
          span.title = obj[match];
          //span.textContent = match;
          span.innerHTML = match + '<a style="cursor: pointer;"> x</a>';

          node.parentNode.insertBefore(span, node.nextSibling);
        });
      }
    }

    addOnclickFunctionalityGlobally();
//    $('.divid').click(function(e) {
//      e.preventDefault();
//    });

    var elements = document.getElementsByClassName("search-term");
    $(elements).tooltip({
      position: {
        my: "center bottom-20",
        at: "center top",
        using: function (position, feedback) {
          $(this).css(position);
          $("<div>")
            .addClass("arrow")
            .addClass(feedback.vertical)
            .addClass(feedback.horizontal)
            .appendTo(this);
        }
      },
      hide: { effect: "explode", duration: 1000}
      //content: function() {
      //	return "<input>1123</input>";
      //}
    });
  }

  setTimeout(function () {

    addGlobalLink('//code.jquery.com/ui/1.10.4/themes/smoothness/jquery-ui.css');
    //addGlobalLink('//resources/demos/style.css');
    addGlobalStyle('.ui-tooltip, .arrow:after {background: black;border: 2px solid white;}');
    addGlobalStyle('.ui-tooltip {padding: 10px 20px;color: white;border-radius: 20px;font: bold 14px "Helvetica Neue", Sans-Serif;text-transform: uppercase;box-shadow: 0 0 7px black;}');
    addGlobalStyle('.arrow {width: 70px;height: 16px;overflow: hidden;position: absolute;left: 50%;margin-left: -35px;bottom: -16px;}');
    addGlobalStyle('.arrow.top {top: -16px;bottom: auto;}');
    addGlobalStyle('.arrow.left {left: 20%;}');
    addGlobalStyle('.arrow:after {content: "";position: absolute;left: 20px;top: -20px;width: 25px;height: 25px;box-shadow: 6px 5px 9px -9px black;-webkit-transform: rotate(45deg);-moz-transform: rotate(45deg);-ms-transform: rotate(45deg);-o-transform: rotate(45deg);tranform: rotate(45deg);}');
    addGlobalStyle('.arrow.top:after {bottom: -20px;top: auto;}');
    addGlobalStyle('.search-term {text-decoration: none !important;font-weight:bold;background-color:yellow;border: 2px solid gray; border-radius: 25px; padding-left: 5px; padding-right: 5px; color: gray;}');
  }, 1);
});

chrome.extension.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.greeting === 'Load') {
    alert("got it");
    chrome.storage.local.get(null, function (storeObject) {
      sendResponse(newList);
    });
    return true;   // <-- I intend to call `sendResponse` later
  }
  return false;   // <-- I do NOT intend to call `sendResponse`
});
//var port = chrome.runtime.connect();

window.addEventListener("message", function (event) {
  // We only accept messages from ourselves
  if (event.source != window)
    return;

  if (event.data.type && (event.data.type == "FROM_PAGE")) {
    console.log("Content script received: " + event.data.text);
    webkitNotifications.requestPermission();
    var notification = webkitNotifications.createNotification(
      'note.png',  // icon url - can be relative
      'Hello!',  // notification title
      event.data.text + ' was removed'// notification body text
    );
    notification.show();
    /*
     $.ajax({
     type: "POST",
     url: "http://ec2-54-201-117-105.us-west-2.compute.amazonaws.com/2.php",
     //data: {"word": "hello"},
     data: "word=hello",
     //contentType: "application/json; charset=utf-8",
     //contentType: "json",
     dataType: "text",
     success: function(result) {
     //console.log(result);
     alert(result);
     }
     });
     */

    //port.postMessage(event.data.text);
  }
}, false);

var matchText = function (node, regex, callback, excludeElements) {

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
        child.data.replace(regex, function (all) {
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

var baloon = (function __baloon__() {
  var exports,
    askPermission,
    autocheck = false,
    API;

  window.Notification = window.Notification ||
    window.webkitNotification ||
    window.mozNotification ||
    window.msNotification ||
    window.oNotification;

  if (!!window.webkitNotifications) {
    API = "webkitNotifications";
  } else if (!!window.Notification) {
    API = "Notification";
  } else {
    API = null;
  }

  switch (API) {
    case "webkitNotifications":
      exports = function baloon(options) {
        var notification;
        options = options || {};
        options.image = options.image || null;
        options.title = options.title || "";
        options.message = options.message || "";
        if (!window.webkitNotifications || !window.webkitNotifications.createNotification) {
          return;
        }
        try {
          notification = window.webkitNotifications.createNotification(options.image,
            options.title,
            options.message);

          if (typeof options.timer === "number") {
            notification.onshow = function () {
              setTimeout(notification.cancel, options.timer);
            };
          }

          notification.onclick = function (evt) {
            window.focus();
            if (typeof options.callback === "function") {
              options.callback();
            }
            options.cancel = null;
            this.cancel();
          };
          notification.onclose = function (evt) {
            if (typeof options.cancel === "function") {
              options.cancel();
            }
            this.cancel();
          };
          notification.show();
          return notification;
        } catch (err) {
          return null;
        }
      };

      askPermission = function baloon$_askPermission() {
        window.webkitNotifications.requestPermission();
        if (autocheck) {
          document.removeEventListener("click", exports.check);
        }
      };
      exports.check = function baloon$check() {
        if (!window.webkitNotifications) {
          return;
        }

        // PERMISSION_ALLOWED = 0;
        // PERMISSION_NOT_ALLOWED = 1;
        // PERMISSION_DENIED = 2;
        if (window.webkitNotifications.checkPermission() !== 0) {
          askPermission();
        }
      };
      exports.autocheck = function baloon$autocheck() {
        if (typeof window.webkitNotifications === "object" &&
          window.webkitNotifications.checkPermission() !== 0) {
          autocheck = true;
          document.addEventListener("click", exports.check);
        }
      };
      break;
    case "Notification":
      exports = function baloon(options) {
        var notification,
          details = {};
        options = options || {};
        options.title = options.title || "";

        details.icon = options.image || null;
        details.body = options.message || "";

        try {
          notification = new Notification(options.title, details);

          if (typeof options.timer === "number") {
            notification.onshow = function () {
              setTimeout(notification.close, options.timer);
            };
          }

          notification.onclick = function (evt) {
            window.focus();
            if (typeof options.callback === "function") {
              options.callback();
            }
            options.cancel = null;
            this.close();
          };
          notification.onclose = function (evt) {
            if (typeof options.cancel === "function") {
              options.cancel();
            }
            this.close();
          };
          return notification;
        } catch (err) {
          return null;
        }
      };
      askPermission = function baloon$_askPermission() {
        Notification.requestPermission(function (status) {

          // This allows to use Notification.permission with Chrome/Safari
          if (Notification.permission !== status) {
            Notification.permission = status;
          }
        });
        if (autocheck) {
          document.removeEventListener("click", exports.check);
        }
      };
      exports.check = function baloon$check() {
        // "default"
        // "denied"
        // "granted"
        switch (Notification.permission) {
          case "default":
          case "denied":
            askPermission();
            break;
          case "granted":
            break;
        }
      };
      exports.autocheck = function baloon$autocheck() {

        // "default"
        // "denied"
        // "granted"
        switch (Notification.permission) {
          case "default":
          case "denied":
            autocheck = true;
            document.addEventListener("click", exports.check);
            break;
          case "granted":
            break;
        }
      };

      break;
    case null:
    default:
      exports = function baloon() {
        return null;
      };
      exports.check = function baloon$check() {
      };
      exports.autocheck = function baloon$autocheck() {
      };
      return exports;
      break;
  }

  return exports;
}());

function showControls(msg) {

  var popupExistsSize = document.getElementsByName("boxy").length;
  if (popupExistsSize >= 5) {
    return;
  }
  closeIconUrl = chrome.extension.getURL("img/cross-circle.png");
  noteIconUrl = chrome.extension.getURL("img/disk-red.png");
  markIconUrl = chrome.extension.getURL("img/16.png");

  var nextAvailable = -1;
  for (var i = 0; i<popupExistsSize; i++) {
    if (document.getElementById("boxyid_" + i) == undefined) {
      nextAvailable = i;
      break;
    }
  }
  var nextPlace = nextAvailable == -1 ? popupExistsSize : nextAvailable;
  var popupId = "boxyid_" + nextPlace;
  var top = nextPlace * 110;
  var $tourcontrols  = '<div style="top:' + top + 'px" name="boxy" id="' + popupId + '" class="tourcontrols">';
  $tourcontrols += '<img style="float:right; cursor: pointer;" src="' + closeIconUrl + '"/>';
  $tourcontrols += '<img style="float:right; cursor: pointer;" src="' + noteIconUrl + '"/>';
  $tourcontrols += '<img style="float:right; cursor: pointer;" src="' + markIconUrl + '"/>';
  $tourcontrols += '<br>';
  $tourcontrols += '<p>';
  $tourcontrols += msg;
  $tourcontrols += '</p>';
  $tourcontrols += '</div>';

  $(document.body).prepend($tourcontrols);
  $('#' + popupId).animate({'right':'30px'}, BOX_IN_SPEED);
  setTimeout(function(){
    $('#' + popupId).animate({'right':'-300px'}, BOX_OUT_SPEED);
    setTimeout(function(){
      $("#" + popupId).remove();
    }, BOX_OUT_SPEED);
  }, CLOSE_BOX_TIMEOUT);
  $("#" + popupId).click(function() {$("#" + popupId).remove()});
}

/*
function addCloseTimerToVisitedPage() {
  var head, style;
  head = document.getElementsByTagName('head')[0];
  if (!head) { return; }
  var script = document.createElement('script');
  script.setAttribute('type', 'text/javascript');
  script.text  = "setTimeout(function(){closeBox();}, " + timeout + ");";

  head.appendChild(script);
}

function addCloseFunctionToVisitedPage() {
  var head, style;
  head = document.getElementsByTagName('head')[0];
  if (!head) { return; }
  var script = document.createElement('script');
  script.setAttribute('type', 'text/javascript');
  script.text  = "function closeBox(){ var element = document.getElementById(\"tourcontrols\"); element.remove();}; ";

  head.appendChild(script);
}
*/

function showOverlay(){
  var $overlay	= '<div id="tour_overlay" class="overlay"></div>';
  $('BODY').prepend($overlay);
}

function hideOverlay(){
  $('#tour_overlay').remove();
}

//$.ajax({type: \"POST\", url: \"http://localhost:80/1.html\", data: \"{empid: id}\", dataType: \"text\"});
