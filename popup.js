$(document).ready(function () {
  $("#sessionStartBtn").click(function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {
        action: "START_SESSION",
      });
    });

    // closing popup
    window.close();
  });

  // getting data from local storage
  function onLoad() {
    resetTextarea();
    getFromStorage(function (cards) {
      console.log(cards.length);
      if (cards.length <= 10) {
        const cardsRemaining = 10 - cards.length;
        $("#popup-remainder").html(
          `You can create <span id="remainder">${cardsRemaining}</span> more cards`
        );
      } else {
        $("#popup-remainder").html(
          `<p>You have already reached the limit. Please remove the old cards to add new cards to deck</p>`
        );
      }
    });
  }

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

  // reset text area
  function resetTextarea() {
    $("#question").val("");
    $("#answer").val("");
  }

  // initial call
  onLoad();
});
