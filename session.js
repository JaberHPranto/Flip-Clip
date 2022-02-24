$(document).ready(function () {
  var cardNo = 0;
  // cancel session
  $(".flag").click(function () {
    console.log("clicked");
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {
        action: "END_SESSION",
      });
    });
  });

  //flipping the card
  // $("#flashcard").click(function () {
  //   $(this).toggleClass("flipped");
  //   console.log("clicked");
  // });

  // session
  $("#knowBtn").click(function () {
    console.log("clicked");
    cardNo = cardNo + 1;
    $("#flashcard").addClass("test");
    getNextCard(cardNo);
  });

  // reset animation
  function resetCard() {
    $("#flashcard").removeClass("test");
  }

  // getting cards from local storage
  function getFromStorage(callback) {
    chrome.storage.sync.get(["cards"], function (result) {
      if (result && result.cards) {
        callback(result.cards);
      } else callback([]);
    });
  }

  // session
  var allCards;
  function startSession() {
    getFromStorage(function (cards) {
      if (cards && cards.length !== 0) {
        allCards = cards;
        console.log(cards);
        getNextCard(0);
      }
    });
  }

  // console.log(allCards);

  function getNextCard(cardNumber) {
    // console.log(cardNo);
    // console.log(allCards);
    $("#flashcard--content_front").text(allCards[cardNumber]?.question);
    $("#flashcard--content_back").text(allCards[cardNumber]?.answer);
    // $("#flashcard").removeClass("test");
    window.setTimeout(() => {
      resetCard();
    }, 1000);
  }

  // initial call
  startSession();
});
