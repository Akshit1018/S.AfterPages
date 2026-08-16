(function () {
  const KEY = "after_code_access_v1";
  const slug = location.pathname.split("/").filter(Boolean)[1] || "page";

  function read() {
    try {
      const raw = JSON.parse(localStorage.getItem(KEY) || "null");
      if (!raw) return { plan: "none", pages: [], until: null };
      if (raw.plan === "year" && raw.until && raw.until < Date.now()) {
        return { plan: "none", pages: [], until: null };
      }
      return raw;
    } catch {
      return { plan: "none", pages: [], until: null };
    }
  }
  function write(next) {
    localStorage.setItem(KEY, JSON.stringify(next));
  }
  function unlocked() {
    const a = read();
    if (a.plan === "life") return true;
    if (a.plan === "year" && a.until && a.until > Date.now()) return true;
    return a.plan === "single" && Array.isArray(a.pages) && a.pages.includes(slug);
  }

  function el(html) {
    const t = document.createElement("template");
    t.innerHTML = html.trim();
    return t.content.firstElementChild;
  }

  const back = document.querySelector(".after-back");
  if (back && !document.querySelector(".after-copy")) {
    const wrap = document.createElement("div");
    wrap.className = "after-bar";
    back.parentNode.insertBefore(wrap, back);
    wrap.appendChild(back);
    const btn = el('<button type="button" class="after-copy">Copy code</button>');
    wrap.appendChild(btn);
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (unlocked()) openCode();
      else openPay();
    });
  }

  let modal;
  function mount() {
    if (modal) return modal;
    modal = el(`
      <div class="after-modal" hidden>
        <div class="after-card" id="afterCard"></div>
      </div>`);
    document.body.appendChild(modal);
    modal.addEventListener("click", (e) => {
      if (e.target === modal) modal.hidden = true;
    });
    return modal;
  }

  function openPay() {
    const root = mount();
    root.hidden = false;
    const card = root.querySelector("#afterCard");
    let plan = "single";
    let method = "upi";
    function paint() {
      card.innerHTML = `
        <div class="after-head">
          <div>
            <p class="after-kicker">Unlock code</p>
            <h2>Get the source</h2>
          </div>
          <button class="after-x" type="button" data-close>×</button>
        </div>
        <div class="after-plans">
          <button class="after-plan ${plan === "single" ? "on" : ""}" data-plan="single">
            <b>This page <span>₹99</span></b>
            <small>one-time</small>
            <ul><li>HTML, CSS & JS for this page</li><li>Copy instantly after pay</li></ul>
          </button>
          <button class="after-plan ${plan === "year" ? "on" : ""}" data-plan="year">
            <b>All pages · 1 year <span>₹999</span></b>
            <small>12 months</small>
            <ul><li>Every AFTER page</li><li>New pages this year included</li></ul>
          </button>
          <button class="after-plan ${plan === "life" ? "on" : ""}" data-plan="life">
            <b>Lifetime + updates <span>₹4,999</span></b>
            <small>forever</small>
            <ul><li>All current and future pages</li><li>Request your own product page</li></ul>
          </button>
        </div>
        <div class="after-pay">
          <div class="after-methods">
            <button class="${method === "upi" ? "on" : ""}" data-m="upi">UPI</button>
            <button class="${method === "card" ? "on" : ""}" data-m="card">Card</button>
          </div>
          ${
            method === "upi"
              ? '<input placeholder="yourname@upi" id="afterField" />'
              : '<input placeholder="Card number" id="afterField" /><input placeholder="MM/YY · CVV" />'
          }
          <button class="after-go" data-pay>Pay ₹${plan === "life" ? "4,999" : plan === "year" ? "999" : "99"}</button>
          <p class="after-note">Payment unlocks copy on this device.</p>
        </div>`;
      card.querySelector("[data-close]").onclick = () => (root.hidden = true);
      card.querySelectorAll("[data-plan]").forEach((b) => {
        b.onclick = () => {
          plan = b.dataset.plan;
          paint();
        };
      });
      card.querySelectorAll("[data-m]").forEach((b) => {
        b.onclick = () => {
          method = b.dataset.m;
          paint();
        };
      });
      card.querySelector("[data-pay]").onclick = () => {
        const now = Date.now();
        const cur = read();
        if (plan === "life") write({ plan: "life", pages: [], until: null, paidAt: now });
        else if (plan === "year")
          write({ plan: "year", pages: [], until: now + 365 * 864e5, paidAt: now });
        else
          write({
            plan: "single",
            pages: Array.from(new Set([...(cur.pages || []), slug])),
            until: null,
            paidAt: now,
          });
        openCode();
      };
    }
    paint();
  }

  async function files() {
    const base = location.pathname.replace(/index\.html$/, "");
    const [html, css, js] = await Promise.all([
      fetch(base + "index.html").then((r) => r.text()),
      fetch(base + "css/styles.css").then((r) => (r.ok ? r.text() : "")),
      fetch(base + "js/main.js").then((r) => (r.ok ? r.text() : "")),
    ]);
    return { html, css, js };
  }

  async function openCode() {
    const root = mount();
    root.hidden = false;
    const card = root.querySelector("#afterCard");
    card.innerHTML = `<div class="after-head"><div><p class="after-kicker">Unlocked</p><h2>Copy the code</h2></div><button class="after-x" data-close>×</button></div><p class="after-note">Loading…</p>`;
    card.querySelector("[data-close]").onclick = () => (root.hidden = true);
    const src = await files();
    let tab = "html";
    const a = read();
    function paint() {
      card.innerHTML = `
        <div class="after-head">
          <div><p class="after-kicker">Unlocked</p><h2>Copy the code</h2></div>
          <button class="after-x" data-close>×</button>
        </div>
        <div class="after-code">
          <div class="after-tabs">
            <button class="${tab === "html" ? "on" : ""}" data-tab="html">HTML</button>
            <button class="${tab === "css" ? "on" : ""}" data-tab="css">CSS</button>
            <button class="${tab === "js" ? "on" : ""}" data-tab="js">JS</button>
          </div>
          <pre id="afterPre"></pre>
          <button class="after-copyall" data-copy>Copy ${tab.toUpperCase()}</button>
          ${
            a.plan === "life"
              ? `<div class="after-req"><p class="after-kicker">Lifetime request</p><textarea id="afterReq" placeholder="Describe the product page you want built…"></textarea><button class="after-copyall" data-req>Send request</button></div>`
              : ""
          }
        </div>`;
      card.querySelector("#afterPre").textContent = src[tab];
      card.querySelector("[data-close]").onclick = () => (root.hidden = true);
      card.querySelectorAll("[data-tab]").forEach((b) => {
        b.onclick = () => {
          tab = b.dataset.tab;
          paint();
        };
      });
      card.querySelector("[data-copy]").onclick = async () => {
        try {
          await navigator.clipboard.writeText(src[tab]);
        } catch {}
        card.querySelector("[data-copy]").textContent = "Copied";
      };
      const req = card.querySelector("[data-req]");
      if (req) {
        req.onclick = () => {
          req.textContent = "Request sent";
        };
      }
    }
    paint();
  }
})();
