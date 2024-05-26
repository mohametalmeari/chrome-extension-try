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
      func: (colors, counter) => {
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
