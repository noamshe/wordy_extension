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

  activateTheme = function (theme_name) {
    $("#activate_theme_button").text("Deactivate Theme");
    $("#activate_panel").removeClass("bg-info").addClass("bg-danger");
    $("#activate_panel").text(theme_name);
    localStorage['activated_theme'] = theme_name;
  }
  deactivateTheme = function (theme_name) {
    $("#activate_theme_button").text("Activate Theme");
    $("#activate_panel").removeClass("bg-danger").addClass("bg-info");
    $("#activate_panel").text("No Activated Theme");
    localStorage['activated_theme'] = "false";
  }

  if (localStorage['activated_theme'] == undefined || localStorage['activated_theme'] == "false") {
    deactivateTheme();
  } else {
    activateTheme(localStorage['activated_theme']);
  }

  // loading themes
  loadThemes = function () {
    $('#theme_select_multiple').empty();
    $.ajax({
      type: "POST",
      url: DB_SERVER + LOAD_THEMES_METHOD,
      dataType: "text",
      success: function (result) {
        console.log(result);
        var result = JSON.parse(result);
        console.log(result[1]);
        var themes_select = $("#theme_select_multiple");
        for (var key in result) {
          if (result.hasOwnProperty(key)) {
            console.log(key + " -> " + result[key]);
            themes_select.append("<option value='" + key + "'>" + result[key] + "</option>");
          }
        }
      },
      error: function (result) {
        console.log(result);
      }
    });
  };

  $('#activate_theme_button').bind('click', function () {
    if ($("#activate_theme_button").text() == "Activate Theme") {
      if ($("select option:selected").val() != undefined) {
        activateTheme($("select option:selected").text());
      }
    } else {
      deactivateTheme();
    }
  });

  $('#add_theme_button').bind('click', function () {
    var theme_name = $('#theme_input').val();
    if (theme_name.length > 0) {
      $('#add_theme_result').text("")
      $.ajax({
        type: "POST",
        url: DB_SERVER + ADD_THEME_METHOD,
        data: "name=" + theme_name,
        dataType: "text",
        success: function (result) {
          $('#add_theme_result').text("saved.")
          loadThemes();
        }
      });
    }
  });

  $("#theme_select_multiple" ).change(function() {
    var theme_id = $("select option:selected").val();
    $.ajax({
      type: "POST",
      url: DB_SERVER + GET_THEME_WORDS,
      data: "id=" + theme_id,
      dataType: "text",
      success: function (result) {
        var theme_list = $("#theme_list");
        theme_list.empty();
        result = JSON.parse(result);
        for (var key in result) {
          if (result.hasOwnProperty(key)) {
            theme_list.append("<li>" + result[key] + "</li>");
          }
        }
      }
    });
  });

  loadThemes();
});

