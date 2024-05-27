// Runs in the background on every reload of the extension, or opening the browser
// Variables defined here are global to the extension

let counter = 0;
let sharedValue = 777;

chrome.action.onClicked.addListener((tab) => {
  chrome.scripting.executeScript(
    {
      target: { tabId: tab.id },
      args: [counter],
      func: (counter) => {
        // Runs inside the active TAB when extension icon is clicked
        counter++;
        console.log("Counter: ", counter);

        return { counter };
      },
    },
    ([{ result }]) => {
      // Runs in the background
      counter = result.counter;
    }
  );
});

let sharedValues = { value: 1 };

chrome.runtime.onMessage.addListener((request, _sender, sendResponse) => {
  if (request.type === "get") {
    sendResponse(sharedValues);
  } else if (request.type === "set") {
    sharedValues = request.data;
    sendResponse({ status: "success" });
  }
  return true;
});
