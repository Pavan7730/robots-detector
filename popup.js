document.addEventListener("DOMContentLoaded", () => {
  chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
    chrome.tabs.sendMessage(tab.id, { type: "GET_META" }, (res) => {
      const out = document.getElementById("output");

      if (chrome.runtime.lastError) {
        out.innerText = "❌ content.js not injected";
        return;
      }

      if (!res) {
        out.innerText = "❌ No response from page";
        return;
      }

      out.innerHTML = `
        <b>Title:</b> ${res.title}<br>
        <b>Canonical:</b> ${res.canonical || "Not found"}<br>
        <b>Meta Robots:</b> ${res.metaRobots || "Not found"}
      `;
    });
  });
});
