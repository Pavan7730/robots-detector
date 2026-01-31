(function () {
  const metaRobots = document.querySelector('meta[name="robots"]')?.content || "Not found";
  const canonical = document.querySelector('link[rel="canonical"]')?.href || "Not found";

  chrome.runtime.sendMessage({
    type: "PAGE_META",
    metaRobots,
    canonical
  });
})();
