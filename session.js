$(document).ready(function () {
  // cancel session
  $(".flag").click(function () {
    console.log("clicked");
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {
        action: "END_SESSION",
      });
    });
  });

  $("#flashcard").click(function () {
    $(this).toggleClass("flipped");
    console.log("clicked");
  });
});
