
$(document).ready(function(){
shortcut.add("Ctrl+Shift+X",function() {
var word = getSelectionHtml();
$.ajax({
    type: "POST",
    url: "http://www.morfix.co.il/" + word,
    //data: "{empid: " + empid + "}",
    //contentType: "application/json; charset=utf-8",
    dataType: "text",
    success: function(result) {
      var doc = document.implementation.createHTMLDocument (result, 'html',  null);
      doc.documentElement.innerHTML = result;
        //console.log(result);
      var elements = doc.getElementsByClassName("translation_he");
      //alert(elements[0].innerHTML);
	webkitNotifications.requestPermission();
	var notification = webkitNotifications.createNotification(
	  'note.png',  // icon url - can be relative
	  '',  // notification title
          elements[0].innerHTML
	  
	);
	notification.show();
    }
});
//  alert(getSelectionHtml());
});

$.ajax({
    type: "POST",
    url: "http://localhost:80/1.html",
    //data: "{empid: " + empid + "}",
    //contentType: "application/json; charset=utf-8",
    dataType: "text",
    success: function(result) {
        //console.log(result);
 	onLoadResult(result);
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
    for(var i = 0; i < words.length; i++) {
	var obj = words[i];
	//console.log(JSON.parse(response.responseText)[0]);
	for (var word in obj) {
            console.log(word);
	    //new_body = new_body.replace(word, "<a href='' class='divid' title='" + obj[word] + "' style='background:yellow; color: red; font-weight: bold'>" + word + "</a>");
            new_body = new_body.replace(word,"<a id='" + word + "' class='divid' href='javascript:void(0)' onClick='go2(this)' title='" + obj[word] + "' style='background:yellow; color: red; font-weight: bold'>" + word + "</a>");
            //wrapWord(new_body, word);
	}
    }
    document.body.innerHTML = new_body;
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
        script.text  = "function go2(elem){ window.postMessage({ type: \"FROM_PAGE\", text: elem.id }, \"*\");};"    
        //script.text  = "function go2(elem){ alert(elem.id) };"    
        //script.text  = "function go2(){ $.ajax({type: \"POST\", url: \"http://localhost:80/1.html\", data: \"{empid: id}\", dataType: \"text\"});alert('Hello from inserted script.') };"    

        head.appendChild(script);
    }
    addGlobalLink('//code.jquery.com/ui/1.10.4/themes/smoothness/jquery-ui.css');
    addGlobalLink('//resources/demos/style.css');	

    addGlobalStyle('.ui-tooltip, .arrow:after {background: black;border: 2px solid white;}');
    addGlobalStyle('.ui-tooltip {padding: 10px 20px;color: white;border-radius: 20px;font: bold 14px "Helvetica Neue", Sans-Serif;text-transform: uppercase;box-shadow: 0 0 7px black;}');
    addGlobalStyle('.arrow {width: 70px;height: 16px;overflow: hidden;position: absolute;left: 50%;margin-left: -35px;bottom: -16px;}');
    addGlobalStyle('.arrow.top {top: -16px;bottom: auto;}');
    addGlobalStyle('.arrow.left {left: 20%;}');
    addGlobalStyle('.arrow:after {content: "";position: absolute;left: 20px;top: -20px;width: 25px;height: 25px;box-shadow: 6px 5px 9px -9px black;-webkit-transform: rotate(45deg);-moz-transform: rotate(45deg);-ms-transform: rotate(45deg);-o-transform: rotate(45deg);tranform: rotate(45deg);}');
    addGlobalStyle('.arrow.top:after {bottom: -20px;top: auto;}');
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
//$.ajax({type: \"POST\", url: \"http://localhost:80/1.html\", data: \"{empid: id}\", dataType: \"text\"});
