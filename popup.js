const output = document.getElementById("output");

chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
  chrome.runtime.sendMessage(
    { type: "CHECK_ROBOTS", url: tab.url },
    (robots) => {
      chrome.runtime.onMessage.addListener((msg) => {
        if (msg.type === "PAGE_META") {
          render(msg, robots);
        }
      });
    }
  );
});

function render(meta, robots) {
  output.innerHTML = `
    <div class="status"><strong>Meta Robots:</strong> ${meta.metaRobots}</div>
    <div class="status"><strong>Canonical:</strong> ${meta.canonical}</div>
    <div class="status"><strong>Robots.txt:</strong> ${robots.blocked ? "Blocked" : "Allowed"}</div>
  `;
}
