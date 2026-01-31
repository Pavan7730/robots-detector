chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.type === "CHECK_ROBOTS") {
    (async () => {
      try {
        const url = new URL(msg.pageUrl);
        const robotsUrl = `${url.origin}/robots.txt`;

        const res = await fetch(robotsUrl);
        const text = await res.text();

        const path = url.pathname;
        const blocked = text.includes(`Disallow: ${path}`) || text.includes("Disallow: /");

        sendResponse({
          robotsStatus: blocked ? "Possibly Blocked" : "Allowed"
        });
      } catch (e) {
        sendResponse({ robotsStatus: "Not Accessible" });
      }
    })();
    return true;
  }
});
