const output = document.getElementById("output");

chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
  if (!tab?.url) {
    output.innerHTML = "Unable to read page URL.";
    return;
  }

  // Ask content script for meta info
  chrome.tabs.sendMessage(tab.id, { type: "GET_META" }, (meta) => {
    if (chrome.runtime.lastError || !meta) {
      output.innerHTML = "Page data not accessible.";
      return;
    }

    // Ask background for robots.txt
    chrome.runtime.sendMessage(
      { type: "CHECK_ROBOTS", url: tab.url },
      (robots) => {
        render(meta, robots);
      }
    );
  });
});

function render(meta, robots) {
  if (robots?.skipped) {
    output.innerHTML = `
      <div class="row warn">Robots.txt not available for this page.</div>
    `;
    return;
  }

  output.innerHTML = `
    <div class="row"><strong>Meta Robots:</strong> ${meta.metaRobots}</div>
    <div class="row"><strong>Canonical:</strong> ${meta.canonical}</div>
    <div class="row">
      <strong>Robots.txt:</strong>
      <span class="${robots.blocked ? "warn" : "ok"}">
        ${robots.blocked ? "Possibly Blocked" : "Allowed"}
      </span>
    </div>
  `;
}
