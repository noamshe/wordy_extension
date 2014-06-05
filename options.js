$(function() {
  $('#builds_option').prop('checked', localStorage['builds_option']);
  $('#attacks_option').prop('checked', localStorage['attacks_option']);
  $('#trainings_option').prop('checked', localStorage['trainings_option']);
  $('#markets_option').prop('checked', localStorage['markets_option']);

  $('#builds_option').bind('click', function() { localStorage['builds_option'] = $(this).prop('checked'); });
  $('#attacks_option').bind('click', function() { localStorage['attacks_option'] = $(this).prop('checked'); });
  $('#trainings_option').bind('click', function() { localStorage['trainings_option'] = $(this).prop('checked'); });
  $('#markets_option').bind('click', function() { localStorage['markets_option'] = $(this).prop('checked'); });
});
