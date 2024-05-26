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

const changeBodyColor = async () => {
  const [tab] = await chrome.tabs.query({ active: true });
  chrome.scripting.executeScript(
    {
      target: { tabId: tab.id },
      args: [colors],
      func: (colors) => {
        // Runs inside the active TAB
        const colorIndex = Math.floor(Math.random() * colors.length);
        const color = colors[colorIndex];
        document.body.style.backgroundColor = color;
        return { color };
      },
    },
    ([{ result }]) => {
      // Runs inside the POPUP
      const { color } = result;
      document.getElementById("colorEl").innerHTML = color;
    }
  );
};

document.getElementById("btn").addEventListener("click", changeBodyColor);
