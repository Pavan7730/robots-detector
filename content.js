console.log("✅ content.js injected");

chrome.runtime.onMessage.addListener((req, sender, sendResponse) => {
  if (req.type === "GET_META") {
    sendResponse({
      success: true,
      title: document.title,
      canonical: document.querySelector("link[rel='canonical']")?.href || null,
      metaRobots: document.querySelector("meta[name='robots']")?.content || null
    });
  }
});
