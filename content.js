(() => {
  const robotsMeta = document.querySelector('meta[name="robots"]');
  const canonicalTag = document.querySelector('link[rel="canonical"]');

  let noIndexFound = false;
  let noFollowFound = false;

  if (robotsMeta) {
    const content = robotsMeta.content.toLowerCase();
    noIndexFound = content.includes("noindex");
    noFollowFound = content.includes("nofollow");
  }

  chrome.runtime.sendMessage({
    type: "META_DATA",
    metaRobots: robotsMeta ? robotsMeta.content : "Not found",
    canonical: canonicalTag ? canonicalTag.href : "Not found",
    noIndexNoFollow: (noIndexFound || noFollowFound)
      ? "Found"
      : "Not Found"
  });
})();
