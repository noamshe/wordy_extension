$(function () {
  $('#mark_words').prop('checked', localStorage['mark_words'] == "true");
  $('#append_words').prop('checked', localStorage['append_words'] == "true");

  $('#dictionary_1').prop('checked', localStorage['dictionary_1'] == "true");
  $('#dictionary_2').prop('checked', localStorage['dictionary_2'] == "true");
  $('#dictionary_3').prop('checked', localStorage['dictionary_3'] == "true");
  $('#dictionary_4').prop('checked', localStorage['dictionary_4'] == "true");
  $('#dictionary_5').prop('checked', localStorage['dictionary_5'] == "true");
  $('#dictionary_6').prop('checked', localStorage['dictionary_6'] == "true");
  $('#dictionary_7').prop('checked', localStorage['dictionary_7'] == "true");
  $('#dictionary_8').prop('checked', localStorage['dictionary_8'] == "true");

  $('#mark_words').bind('click', function () {
    localStorage['mark_words'] = $(this).prop('checked');
  });
  $('#append_words').bind('click', function () {
    localStorage['append_words'] = $(this).prop('checked');
  });

  $('#dictionary_1').bind('click', function () {
    localStorage['dictionary_1'] = $(this).prop('checked');
  });
  $('#dictionary_2').bind('click', function () {
    localStorage['dictionary_2'] = $(this).prop('checked');
  });
  $('#dictionary_3').bind('click', function () {
    localStorage['dictionary_3'] = $(this).prop('checked');
  });
  $('#dictionary_4').bind('click', function () {
    localStorage['dictionary_4'] = $(this).prop('checked');
  });
  $('#dictionary_5').bind('click', function () {
    localStorage['dictionary_5'] = $(this).prop('checked');
  });
  $('#dictionary_6').bind('click', function () {
    localStorage['dictionary_6'] = $(this).prop('checked');
  });
  $('#dictionary_7').bind('click', function () {
    localStorage['dictionary_7'] = $(this).prop('checked');
  });
  $('#dictionary_8').bind('click', function () {
    localStorage['dictionary_8'] = $(this).prop('checked');
  });
});

