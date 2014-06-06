/**
 * Created by noam on 06/06/14.
 */
$("#search").submit(function(event) {
  event.preventDefault();

  var resultFunction2 = function(result, word) {
    var msg = parseResultDocument(result, word);
  }

  $("#result").html('');
  var values = $(this).serialize();
  var word = $("#word_id").val();

  var res = parseSelection(word, function(result, word) {
    var msg = parseResultDocument(result, word);
    $("#result").html(msg);
  });
});