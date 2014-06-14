/**
 * Created by noam on 06/06/14.
 */
$("#help_text_1").html(POPUP_HELP_TEXT_1);
$("#help_text_2").html(POPUP_HELP_TEXT_2);
$("#search_from_popup").submit(function(event) {
  event.preventDefault();

  $("#result").html('');
  var values = $(this).serialize();
  var word = $("#word_id").val();

  var res = parseSelection(word, function(result, word, translationObj) {
    var msg = parseResultDocument(result, word, translationObj);
    $("#result").html(msg);
    addWordToDB(word, msg, function(){
      $("#result2").html(ADDED_TO_DB_TEXT);
    });
  });
});