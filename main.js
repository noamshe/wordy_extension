/**
 * Created by noam on 06/06/14.
 */
$("#url").submit(function(event) {
  event.preventDefault();


  $("#result").html('');


  var values = $(this).serialize();


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
});