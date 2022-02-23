$(document).ready(function () {
  $("#sessionStartBtn").click(function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {
        action: "START_SESSION",
      });
    });
  });
});
