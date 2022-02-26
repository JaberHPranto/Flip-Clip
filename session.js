$(document).ready(function () {
  var cardNo = 0;
  var numberOfCards;
  let numberOfCorrect = 0;
  let numberOfIncorrect = 0;
  let numberOfForget = 0;

  // hide end screen
  $(".session-end-container").hide();

  // cancel session
  $(".flag").click(endSession);
  $(".finishBtn").click(endSession);

  function endSession() {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {
        action: "END_SESSION",
      });
    });
  }

  //button click events
  $("#knowBtn").click(function () {
    $("#flashcard").addClass("flipped");
  });

  $("#forgetBtn").click(function () {
    $("#flashcard").addClass("flipped");
    numberOfForget++;
  });

  $("#correctBtn").click(function () {
    if (cardNo === numberOfCards - 1) {
      numberOfCorrect++;
      setStats();
      $("#flashcard-container").hide();
      $(".session-end-container").show();
    } else {
      cardNo = cardNo + 1;
      numberOfCorrect++;
      $("#flashcard").addClass("flip-out-anime");
      getNextCard(cardNo);
    }
  });

  $("#incorrectBtn").click(function () {
    if (cardNo === numberOfCards - 1) {
      numberOfIncorrect++;
      setStats();
      $("#flashcard-container").hide();
      $(".session-end-container").show();
    } else {
      cardNo = cardNo + 1;
      numberOfIncorrect++;
      $("#flashcard").addClass("flip-out-anime");
      getNextCard(cardNo);
    }
  });

  // reset animation
  function resetCard() {
    $("#flashcard").removeClass("flip-out-anime");
    $("#flashcard").removeClass("flipped");
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
        numberOfCards = cards.length;
        console.log(cards);
        getNextCard(0);
      }
    });
  }

  function getNextCard(cardNumber) {
    $("#flashcard--content_front").text(allCards[cardNumber]?.question);
    $("#flashcard--content_back").text(allCards[cardNumber]?.answer);
    window.setTimeout(() => {
      resetCard();
    }, 1000);
  }

  function setStats() {
    $(".correct").append(`<span>${numberOfCorrect}/${numberOfCards}</span>`);
    $(".wrong").append(`<span>${numberOfIncorrect}/${numberOfCards}</span>`);
    $(".forget").append(`<span>${numberOfForget}/${numberOfCards}</span>`);
  }

  // initial call
  startSession();
});
