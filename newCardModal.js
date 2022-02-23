$(document).ready(function () {
  $("#newCardBtn").attr("disabled", true);
  // creating new card
  chrome.storage.sync.get(["message"], function (result) {
    if (result) {
      console.log(result);
      // for question
      if (result.message.itemId === "cardFront") {
        $("#question").val(sanitizeString(result.message.text));
      }
      // for answer
      else if (result.message.itemId === "cardBack") {
        $("#answer").val(sanitizeString(result.message.text));
      }
    }

    // disable button until all text field is not empty
  });

  function checkStatus() {
    var q = $("#question").val();
    var ans = $("#answer").val();
    if (q != "" && ans != "") {
      $("#newCardBtn").attr("disabled", false);
      $("#newCardBtn").removeClass("cardOff");
    } else {
      $("#newCardBtn").attr("disabled", true);
      $("#newCardBtn").addClass("cardOff");
    }
  }
  $(document).on("input", "textarea", checkStatus);

  $("#cancelBtn").click(function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {
        action: "REMOVE_CARD",
      });
    });
  });

  // sanitizing input
  function sanitizeString(str) {
    str = str.replace(/[^a-z0-9 \.,_-]/gim, "");
    return str.trim();
  }
});
