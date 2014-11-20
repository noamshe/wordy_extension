/**
 * Created by noam on 06/06/14.
 */
$("#help_text_1").html(POPUP_HELP_TEXT_1);
$("#help_text_2").html(POPUP_HELP_TEXT_2);

chrome.runtime.sendMessage({method: "getTheme"}, function (response) {
  console.log(response.theme_name);
  if (response.theme_name != "false") {
    $('<img id="theme_search" data-theme-id = "' + response.theme_id + '" title="' + response.theme_name + '" src="' + POPUP_THEME_ICON + '" style="float:left; margin-left:5px; height:24px;" type="image" value="Search"/><div style="margin-top:3px; margin-left:32px; color:#AF5500; text-align: center; width:158px; border: 1px solid; background-color: #FFD732">' + response.theme_name + '</div></br>').insertAfter("#space");
  }
});

$("#search_from_popup").submit(function(event) {

  event.preventDefault();

  $("#result").html('');

  var theme_id = $("#theme_search").data("themeId");
  var word = $("#word_id").val();

  // todo take that save to db will happen only once
  // todo add to translation object the savetodb flag
  var res = parseSelection(word, {"output" : function(result, word, translationObj) {
    var msg = parseResultDocument(result, word, translationObj);
    $("#result").append('<div style="background-color: ' + LANGUAGE_SEPERATOR_COLOR + '; display: block">' + translationObj.title + '</div>');
    $("#result").append('<div style="text-align: ' +  translationObj.align + '">' + msg + '</div>');
    addWordToDB(word, msg, theme_id, function(){
      $("#result2").html(ADDED_TO_DB_TEXT);
    });
  },
  "type" : "popup"});
});