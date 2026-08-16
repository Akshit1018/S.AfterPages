document.addEventListener("DOMContentLoaded", () => {
  let qty = 1;
  const qtyEl = document.getElementById("qty");
  const count = document.getElementById("count");
  const toast = document.getElementById("toast");
  const hero = document.getElementById("hero");
  const sheet = document.getElementById("sheet");
  const bundle = document.getElementById("bundle");

  const fmt = (n) => "₹ " + n.toLocaleString("en-IN") + ".00";
  function show(msg) {
    toast.textContent = msg;
    toast.classList.add("show");
    setTimeout(() => toast.classList.remove("show"), 2200);
  }
  function bundleTotal() {
    const a = document.getElementById("p1").checked;
    const b = document.getElementById("p2").checked;
    bundle.textContent = fmt((a ? 7000 : 0) + (b ? 7000 : 0));
  }

  document.querySelectorAll("#colors button").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelectorAll("#colors button").forEach((b) => b.classList.remove("on"));
      btn.classList.add("on");
      hero.src = btn.dataset.src;
    });
  });
  document.querySelectorAll("#sizes button").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelectorAll("#sizes button").forEach((b) => b.classList.remove("on"));
      btn.classList.add("on");
    });
  });
  document.getElementById("minus").addEventListener("click", () => {
    if (qty > 1) {
      qty -= 1;
      qtyEl.textContent = String(qty);
    }
  });
  document.getElementById("plus").addEventListener("click", () => {
    qty += 1;
    qtyEl.textContent = String(qty);
  });
  document.getElementById("add").addEventListener("click", () => {
    count.textContent = String((parseInt(count.textContent, 10) || 0) + qty);
    show("Added " + qty + " · " + fmt(7000 * qty));
  });
  document.getElementById("copy").addEventListener("click", async () => {
    try { await navigator.clipboard.writeText("BUY10000"); } catch {}
    show("Code BUY10000 copied");
  });
  document.getElementById("p1").addEventListener("change", bundleTotal);
  document.getElementById("p2").addEventListener("change", bundleTotal);
  document.getElementById("bundleBtn").addEventListener("click", () => {
    const n = (document.getElementById("p1").checked ? 1 : 0) + (document.getElementById("p2").checked ? 1 : 0);
    if (!n) return show("Select at least one set");
    count.textContent = String((parseInt(count.textContent, 10) || 0) + n);
    show("Bundle added");
  });
  document.getElementById("chart").addEventListener("click", () => { sheet.hidden = false; });
  document.getElementById("closeChart").addEventListener("click", () => { sheet.hidden = true; });
  sheet.addEventListener("click", (e) => { if (e.target === sheet) sheet.hidden = true; });
});
