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
        return { color, newCounter: counter };
      },
    },
    ([{ result }]) => {
      // Runs inside the POPUP
      const { color, newCounter } = result;
      counter = newCounter; // Updating already defined variable

      document.getElementById("colorEl").innerHTML = color;
      document.getElementById("counterEl").innerHTML = counter;
    }
  );
};

document.getElementById("btn").addEventListener("click", changeBodyColor);
