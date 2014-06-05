$(function () {
  //alert("fsdaf");
  alert(localStorage['mark_words']);
  Document.getElementById("hello").innerText(res);
  window.postMessage({ type: "FROM_PAGE", text: "hello"}, "*");
});

