chrome.contextMenus.create({
  title: 'Create a flashcard for "%s"',
  contexts: ["selection"],
  id: "newCard",
});

chrome.contextMenus.create({
  title: "Create question from selection",
  contexts: ["selection"],
  parentId: "newCard",
  id: "cardFront",
});

chrome.contextMenus.create({
  title: "Create answer from selection",
  contexts: ["selection"],
  parentId: "newCard",
  id: "cardBack",
});

chrome.contextMenus.onClicked.addListener(function (clickedData) {
  console.log(clickedData);
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(
      tabs[0].id,
      {
        itemId: clickedData?.menuItemId,
        text: clickedData?.selectionText,
        pageUrl: clickedData?.pageUrl,
      },
      function (response) {
        console.log("kok");
      }
    );
  });
});
