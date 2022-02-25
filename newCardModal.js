$(document).ready(function () {
  let pageUrl;
  $("#newCardBtn").attr("disabled", true);
  // creating new card
  chrome.storage.sync.get(["message"], function (result) {
    if (result) {
      // for question
      if (result.message.itemId === "cardFront") {
        $("#question").val(sanitizeString(result.message.text));
      }
      // for answer
      else if (result.message.itemId === "cardBack") {
        $("#answer").val(sanitizeString(result.message.text));
      }
      pageUrl = result.message.pageUrl;
    }
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

  // handle card creation
  $("#newCardBtn").click(function () {
    getFromStorage(function (cards) {
      console.log(cards);
      const question = sanitizeString($("#question").val());
      const answer = sanitizeString($("#answer").val());
      const card = {
        id: getID(),
        question,
        answer,
        pageUrl,
      };

      cards.push(card);
      saveToStorage(cards);
      resetTextarea();
    });
  });

  // local storage
  function getFromStorage(callback) {
    chrome.storage.sync.get(["cards"], function (result) {
      if (result && result.cards) {
        callback(result.cards);
      } else callback([]);
    });
  }

  function saveToStorage(cards, cb) {
    chrome.storage.sync.set({ cards }, function () {
      console.log("card added");
    });
  }

  // sanitizing input
  function sanitizeString(str) {
    str = str.replace(/[^a-z0-9 \.,_-]/gim, "");
    return str.trim();
  }

  // generate unique id
  function getID() {
    console.log(Math.random().toString(36));
    return "_" + Math.random().toString(36).substr(2, 9);
  }

  function resetTextarea() {
    $("#question").val("");
    $("#answer").val("");
  }

  // just for testing -- will remove later
  // getFromStorage(function (cards) {
  //   console.log(cards);
  // });
});
