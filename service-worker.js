chrome.action.onClicked.addListener((tab) => {
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: () => {
      alert("Hello from the service worker!");
      console.log("Runs inside the active tab console!");
    },
  });
});

console.log("Runs inside the extension console!");
