$(document).ready(function () {
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "CREATE_CARD") {
      chrome.storage.sync.set({ message }, function () {
        showNewCard();
      });
    } else if (message.action === "REMOVE_CARD") {
      $("#newCardFrame").remove();
    }

    return true;
  });

  function showNewCard() {
    let iFrame = document.createElement("iframe");
    iFrame.src = chrome.runtime.getURL("html/newCardModal.html");
    iFrame.id = "newCardFrame";
    iFrame.style.height = "400px";
    iFrame.style.width = "420px";
    iFrame.style.position = "fixed";
    iFrame.style.margin = "auto";
    iFrame.style.zIndex = "999999";
    iFrame.style.borderWidth = 0;
    iFrame.style.borderRadius = "8px";
    iFrame.style.top = "0";
    iFrame.style.left = "0";
    iFrame.style.right = "0";
    iFrame.style.bottom = "0";
    iFrame.setAttribute("align", "middle");

    document.body.insertBefore(iFrame, document.body.firstChild);
  }
});
