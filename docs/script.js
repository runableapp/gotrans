(function () {
  "use strict";

  document.addEventListener("DOMContentLoaded", function () {
    var yearEl = document.getElementById("copyright-year");
    if (yearEl) {
      yearEl.textContent = String(new Date().getFullYear());
    }
  });

  var path = window.location.pathname || "";
  var file = path.split("/").pop() || "index.html";
  if (file === "" || file === "/") file = "index.html";

  document.querySelectorAll(".lang-switch a").forEach(function (a) {
    var href = a.getAttribute("href") || "";
    if (href === file || (file === "index.html" && (href === "index.html" || href === "./index.html"))) {
      a.classList.add("is-current");
      a.setAttribute("aria-current", "page");
    }
  });

  document.querySelectorAll(".pre-wrap").forEach(function (wrap) {
    var pre = wrap.querySelector("pre");
    if (!pre) return;

    var btn = document.createElement("button");
    btn.type = "button";
    btn.className = "copy-btn";
    var root = document.documentElement;
    function label(key, fallback) {
      return wrap.getAttribute(key) || root.getAttribute(key) || fallback;
    }
    btn.textContent = label("data-copy-label", "Copy");

    btn.addEventListener("click", function () {
      var text = pre.textContent || "";
      function done() {
        btn.classList.add("copied");
        btn.textContent = label("data-copied-label", "Copied");
        window.setTimeout(function () {
          btn.classList.remove("copied");
          btn.textContent = label("data-copy-label", "Copy");
        }, 1600);
      }

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(done).catch(function () {
          btn.textContent = label("data-fail-label", "Select & copy");
        });
      } else {
        btn.textContent = label("data-fail-label", "Select & copy");
      }
    });

    wrap.appendChild(btn);
  });
})();
