$(function () {
  $('#mark_words').prop('checked', localStorage['mark_words'] == "true");

  $('#mark_words').bind('click', function () {
    localStorage['mark_words'] = $(this).prop('checked');
  });
});

