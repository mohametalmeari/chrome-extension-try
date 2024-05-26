console.log("Popup:", "Runs inside the extension console!");

const greeting = async () => {
  const [tab] = await chrome.tabs.query({ active: true });
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: () => {
      alert("Hello from popup!");
      console.log("Popup:", "Runs inside the active tab console!");
    },
  });
};

document.getElementById("btn").addEventListener("click", greeting);
