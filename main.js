/**
 * Created by noam on 06/06/14.
 */
$("#url").submit(function(event) {
  event.preventDefault();


  $("#result").html('');
  var values = $(this).serialize();
  var word = $("#word_id").val();

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
      var elements;
      var msg;
      if (!isHebrew(word)) {
        elements = doc.getElementsByClassName("translation_he");
        msg = elements[0].innerHTML;
      } else {
        elements = doc.getElementsByClassName("definition");
        msg = $(doc).find(".definition span").text();
      }
      $("#result").html(msg);

  }});

/*
  $.ajax({
    url: "http://www.example.com/adddata.php",
    type: "post",
    data: values,
    success: function(text){

      alert(text);
      $("#result").html('Submitted successfully');
    },
    error:function(){
      alert("failure");
      $("#result").html('There is error while submit');
    }
  });
  */
});