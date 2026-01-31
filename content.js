chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.type === "GET_META") {
    const robotsMeta = document.querySelector('meta[name="robots"]');
    const canonicalTag = document.querySelector('link[rel="canonical"]');

    let noIndexNoFollow = "Not Found";

    if (robotsMeta) {
      const content = robotsMeta.content.toLowerCase();
      if (content.includes("noindex") || content.includes("nofollow")) {
        noIndexNoFollow = "Found";
      }
    }

    sendResponse({
      metaRobots: robotsMeta ? robotsMeta.content : "Not found",
      canonical: canonicalTag ? canonicalTag.href : "Not found",
      noIndexNoFollow
    });
  }

  return true;
});
