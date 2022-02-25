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

  $("#removeCardBtn").click(function () {
    if (confirmCancel()) {
      chrome.storage.sync.set({ cards: [] }, function () {
        console.log("all cards removed");
      });
      window.close();
    }
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

  // reset text area
  function resetTextarea() {
    $("#question").val("");
    $("answer").val("");
  }

  function confirmCancel() {
    if (
      window.confirm(
        "The action will remove all cards from deck.Are you sure ?"
      )
    ) {
      return true;
    } else return false;
  }

  // initial call
  onLoad();
});
