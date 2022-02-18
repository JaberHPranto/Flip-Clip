$(document).ready(function () {
  chrome.storage.sync.get(["message"], function (result) {
    if (result) {
      console.log(result);
      $("#heading2").text(result.message.text);
    }
  });

  $("#cancelBtn").click(function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {
        action: "REMOVE_CARD",
      });
    });
  });
});
