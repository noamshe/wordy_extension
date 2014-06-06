/**
 * Created by noam on 06/06/14.
 */
$("#search").submit(function(event) {
  event.preventDefault();

  $("#result").html('');
  var values = $(this).serialize();
  var word = $("#word_id").val();

  var res = parseSelection(word, function(result, word) {
    var msg = parseResultDocument(result, word);
    $("#result").html(msg);
    addWordToDB(word, msg, function(){
      $("#result2").html(".המילה התווספה למאגר");
    });
  });
});