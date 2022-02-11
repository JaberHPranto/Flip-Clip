chrome.storage.sync.get(["message"], function (result) {
  if (result) {
    console.log(result);
    $("#heading2").text(result.message.text);
  }
});
