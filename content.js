chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.type === "GET_META") {
    const metaRobots =
      document.querySelector('meta[name="robots"]')?.content || "Not found";

    const canonical =
      document.querySelector('link[rel="canonical"]')?.href || "Not found";

    sendResponse({ metaRobots, canonical });
  }
});
