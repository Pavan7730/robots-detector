chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "CHECK_ROBOTS") {
    checkRobots(message.url).then(sendResponse);
    return true;
  }
});

async function checkRobots(pageUrl) {
  try {
    // Ignore chrome:// and other internal pages
    if (!pageUrl.startsWith("http://") && !pageUrl.startsWith("https://")) {
      return {
        skipped: true,
        reason: "Internal browser page"
      };
    }

    const url = new URL(pageUrl);
    const robotsUrl = `${url.origin}/robots.txt`;

    const res = await fetch(robotsUrl);
    const text = await res.text();

    return {
      robotsUrl,
      blocked: text.includes("Disallow: /"),
      fetched: true
    };
  } catch (e) {
    return { error: "Unable to fetch robots.txt" };
  }
}
