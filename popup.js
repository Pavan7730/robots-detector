chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
  chrome.runtime.sendMessage(
    { type: "CHECK_ROBOTS", pageUrl: tab.url },
    (robotsRes) => {
      chrome.runtime.onMessage.addListener((metaRes) => {
        if (metaRes.type === "META_DATA") {
          document.getElementById("output").innerText = `
Meta Robots: ${metaRes.metaRobots}
Canonical: ${metaRes.canonical}
Robots.txt: ${robotsRes.robotsStatus}
Non Follow / No Index: ${metaRes.noIndexNoFollow}
          `.trim();
        }
      });
    }
  );
});
