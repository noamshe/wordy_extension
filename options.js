$(function () {
  $('#mark_words').prop('checked', localStorage['mark_words'] == "true");
  $('#append_words').prop('checked', localStorage['append_words'] == "true");

  $('#dictionary_1_popup').prop('checked', localStorage['dictionary_1_popup'] == "true");
  $('#dictionary_2_popup').prop('checked', localStorage['dictionary_2_popup'] == "true");
  $('#dictionary_3_popup').prop('checked', localStorage['dictionary_3_popup'] == "true");
  $('#dictionary_4_popup').prop('checked', localStorage['dictionary_4_popup'] == "true");
  $('#dictionary_5_popup').prop('checked', localStorage['dictionary_5_popup'] == "true");
  $('#dictionary_6_popup').prop('checked', localStorage['dictionary_6_popup'] == "true");
  $('#dictionary_7_popup').prop('checked', localStorage['dictionary_7_popup'] == "true");
  $('#dictionary_8_popup').prop('checked', localStorage['dictionary_8_popup'] == "true");

  $('#dictionary_1_page').prop('checked', localStorage['dictionary_1_page'] == "true");
  $('#dictionary_2_page').prop('checked', localStorage['dictionary_2_page'] == "true");
  $('#dictionary_3_page').prop('checked', localStorage['dictionary_3_page'] == "true");
  $('#dictionary_4_page').prop('checked', localStorage['dictionary_4_page'] == "true");
  $('#dictionary_5_page').prop('checked', localStorage['dictionary_5_page'] == "true");
  $('#dictionary_6_page').prop('checked', localStorage['dictionary_6_page'] == "true");
  $('#dictionary_7_page').prop('checked', localStorage['dictionary_7_page'] == "true");
  $('#dictionary_8_page').prop('checked', localStorage['dictionary_8_page'] == "true");

  $('#mark_words').bind('click', function () {
    localStorage['mark_words'] = $(this).prop('checked');
  });
  $('#append_words').bind('click', function () {
    localStorage['append_words'] = $(this).prop('checked');
  });

  $('#dictionary_1_popup').bind('click', function () {
    localStorage['dictionary_1_popup'] = $(this).prop('checked');
  });
  $('#dictionary_2_popup').bind('click', function () {
    localStorage['dictionary_2_popup'] = $(this).prop('checked');
  });
  $('#dictionary_3_popup').bind('click', function () {
    localStorage['dictionary_3_popup'] = $(this).prop('checked');
  });
  $('#dictionary_4_popup').bind('click', function () {
    localStorage['dictionary_4_popup'] = $(this).prop('checked');
  });
  $('#dictionary_5_popup').bind('click', function () {
    localStorage['dictionary_5_popup'] = $(this).prop('checked');
  });
  $('#dictionary_6_popup').bind('click', function () {
    localStorage['dictionary_6_popup'] = $(this).prop('checked');
  });
  $('#dictionary_7_popup').bind('click', function () {
    localStorage['dictionary_7_popup'] = $(this).prop('checked');
  });
  $('#dictionary_8_popup').bind('click', function () {
    localStorage['dictionary_8_popup'] = $(this).prop('checked');
  });
  $('#dictionary_1_page').bind('click', function () {
    localStorage['dictionary_1_page'] = $(this).prop('checked');
  });
  $('#dictionary_2_page').bind('click', function () {
    localStorage['dictionary_2_page'] = $(this).prop('checked');
  });
  $('#dictionary_3_page').bind('click', function () {
    localStorage['dictionary_3_page'] = $(this).prop('checked');
  });
  $('#dictionary_4_page').bind('click', function () {
    localStorage['dictionary_4_page'] = $(this).prop('checked');
  });
  $('#dictionary_5_page').bind('click', function () {
    localStorage['dictionary_5_page'] = $(this).prop('checked');
  });
  $('#dictionary_6_page').bind('click', function () {
    localStorage['dictionary_6_page'] = $(this).prop('checked');
  });
  $('#dictionary_7_page').bind('click', function () {
    localStorage['dictionary_7_page'] = $(this).prop('checked');
  });
  $('#dictionary_8_page').bind('click', function () {
    localStorage['dictionary_8_page'] = $(this).prop('checked');
  });
});

