const output = document.getElementById("output");

chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
  if (!tab || !tab.url) {
    output.innerHTML = "Unable to read page.";
    return;
  }

  chrome.tabs.sendMessage(tab.id, { type: "GET_META" }, (meta) => {
    if (chrome.runtime.lastError || !meta) {
      output.innerHTML = "Meta data not accessible.";
      return;
    }

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
    output.innerHTML = "Robots.txt not applicable for this page.";
    return;
  }

  let indexingSignal = "Indexable signals present";

  if (meta.metaRobots.includes("noindex")) {
    indexingSignal = "Noindex detected";
  } else if (robots.blocksGoogle || robots.blocksAll) {
    indexingSignal = "Blocked from crawling";
  }

  let robotsStatus = "Allowed for Googlebot";
  let details = "";

  if (robots.blocksAll) {
    robotsStatus = "Blocked for all bots";
  } else if (robots.blocksGoogle) {
    robotsStatus = "Blocked for Googlebot";
  } else if (robots.blockedBots?.length) {
    robotsStatus = "Partially blocked";
    details = `Blocked bots: ${robots.blockedBots.join(", ")}`;
  }

  output.innerHTML = `
    <div><strong>Indexing Signals:</strong> ${indexingSignal}</div>
    <div><strong>Meta Robots:</strong> ${meta.metaRobots}</div>
    <div><strong>Canonical:</strong> ${meta.canonical}</div>
    <div><strong>Robots.txt:</strong> ${robotsStatus}</div>
    ${details ? `<small>${details}</small>` : ""}
  `;
}
