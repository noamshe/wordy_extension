$(function () {
  $('#mark_words').prop('checked', localStorage['mark_words'] == "true");
  $('#append_words').prop('checked', localStorage['append_words'] == "true");

  $('#mark_words').bind('click', function () {
    localStorage['mark_words'] = $(this).prop('checked');
  });
  $('#append_words').bind('click', function () {
    localStorage['append_words'] = $(this).prop('checked');
  });
});

