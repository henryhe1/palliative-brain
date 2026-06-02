import { QuartzComponentConstructor, QuartzComponentProps } from "./types"

function PageTracker(_props: QuartzComponentProps) {
  return <div style="display:none"></div>
}

PageTracker.afterDOMLoaded = `
(function () {
  var WORKER_URL = "https://space-vitae-tracking.hello-henryhe.workers.dev";
  var SESSION_KEY = "sv_session";
  var sessionId = sessionStorage.getItem(SESSION_KEY);
  if (!sessionId) {
    sessionId = Math.random().toString(36).slice(2) + Date.now().toString(36);
    sessionStorage.setItem(SESSION_KEY, sessionId);
  }
  var slug = location.pathname.replace(/\\/$/, "") || "/";
  fetch(WORKER_URL + "/track", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ slug: slug, event: "view", sessionId: sessionId }),
    keepalive: true,
  }).catch(function () {});
})();
`

export default (() => PageTracker) satisfies QuartzComponentConstructor