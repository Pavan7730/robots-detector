document.addEventListener("DOMContentLoaded", () => {
  chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
    if (!tab || !tab.id) {
      document.getElementById("output").innerText = "No active tab";
      return;
    }

    chrome.tabs.sendMessage(tab.id, { type: "GET_META" }, (metaRes) => {
      if (!metaRes) {
        document.getElementById("output").innerText =
          "Meta data not accessible.";
        return;
      }

      chrome.runtime.sendMessage(
        { type: "CHECK_ROBOTS", pageUrl: tab.url },
        (robotsRes) => {
          document.getElementById("output").innerText = `
Meta Robots: ${metaRes.metaRobots}
Canonical: ${metaRes.canonical}
Robots.txt: ${robotsRes.robotsStatus}
Non Follow / No Index: ${metaRes.noIndexNoFollow}
          `.trim();
        }
      );
    });
  });
});
