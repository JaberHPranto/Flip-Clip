var messageText;
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  // console.log(message);
  // alert(message.text);
  messageText = message.text;
  chrome.storage.sync.set({ message }, function () {
    showNewCard();
  });
  return true;
});

// newCardModal.html
// export { messageText };

function showNewCard() {
  let iFrame = document.createElement("iframe");
  iFrame.src = chrome.runtime.getURL("newCardModal.html");
  iFrame.style.height = "400px";
  iFrame.style.width = "420px";
  iFrame.style.backgroundColor = "skyblue";
  iFrame.style.position = "fixed";
  iFrame.style.margin = "auto auto";
  iFrame.style.zIndex = "999999";
  iFrame.style.top = "0";
  iFrame.style.left = "0";
  iFrame.style.right = "0";
  iFrame.style.bottom = "50";

  document.body.insertBefore(iFrame, document.body.firstChild);
}
