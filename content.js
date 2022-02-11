// $(document).ready(function () {
// });

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log(message);
  alert(message.text);
  return true;
});
