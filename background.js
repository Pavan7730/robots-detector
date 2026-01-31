chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "CHECK_ROBOTS") {
    checkRobots(message.url).then(sendResponse);
    return true;
  }
});

async function checkRobots(pageUrl) {
  try {
    const url = new URL(pageUrl);
    const robotsUrl = `${url.origin}/robots.txt`;

    const res = await fetch(robotsUrl);
    const text = await res.text();

    const isBlocked = text.includes("Disallow: /");

    return {
      robotsUrl,
      blocked: isBlocked,
      raw: text.substring(0, 500)
    };
  } catch (e) {
    return { error: "Unable to fetch robots.txt" };
  }
}
