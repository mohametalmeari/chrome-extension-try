// Shared Values between POPUP and Background
const shareValue = (type = "get", data = null) => {
  return new Promise((resolve, reject) => {
    chrome.runtime.sendMessage({ type, data }, (response) => {
      if (chrome.runtime.lastError) {
        reject(chrome.runtime.lastError);
      } else {
        resolve(response);
      }
    });
  });
};

(async () => {
  try {
    console.log("Shared Values: ", await shareValue("get"));

    const res = await shareValue("set", { value: 2 });
    console.log(res);

    console.log("New Shared Values: ", await shareValue("get"));
  } catch (error) {
    console.error("Error: ", error);
  }
})();

// Runs inside the POPUP
const colors = [
  "red",
  "green",
  "blue",
  "yellow",
  "pink",
  "purple",
  "orange",
  "black",
  "white",
  "violet",
];

let counter = 0;

const changeBodyColor = async () => {
  const [tab] = await chrome.tabs.query({ active: true });
  chrome.scripting.executeScript(
    {
      target: { tabId: tab.id },
      args: [colors, counter],
      func: async (colors, counter) => {
        // Runs inside the active TAB
        const colorIndex = Math.floor(Math.random() * colors.length);
        const color = colors[colorIndex];
        document.body.style.backgroundColor = color;

        counter++;
        console.log("Counter: ", counter);

        let savedCounter = localStorage.getItem("counter") || 0;
        localStorage.setItem("counter", ++savedCounter);
        console.log("Saved Counter: ", savedCounter);

        let sessionCounter = sessionStorage.getItem("counter") || 0;
        sessionStorage.setItem("counter", ++sessionCounter);
        console.log("Session Counter: ", sessionCounter);

        // Shared Values between active TAB and Background
        const shareValue = (type = "get", data = null) => {
          return new Promise((resolve, reject) => {
            chrome.runtime.sendMessage({ type, data }, (response) => {
              if (chrome.runtime.lastError) {
                reject(chrome.runtime.lastError);
              } else {
                resolve(response);
              }
            });
          });
        };

        try {
          console.log("Shared Values: ", await shareValue("get"));

          const res = await shareValue("set", { value: 3 });
          console.log(res);

          console.log("New Shared Values: ", await shareValue("get"));
        } catch (error) {
          console.error("Error: ", error);
        }

        return { color, counter };
      },
    },
    ([{ result }]) => {
      // Runs inside the POPUP
      const { color } = result; // Pass new variable
      counter = result.counter; // Updating already defined variable

      document.getElementById("colorEl").innerHTML = color;
      document.getElementById("counterEl").innerHTML = counter;
    }
  );
};

document.getElementById("btn").addEventListener("click", changeBodyColor);
