document.addEventListener("DOMContentLoaded", () => {
  let qty = 1;
  const qtyEl = document.getElementById("qty");
  const countEl = document.getElementById("count");
  const toast = document.getElementById("toast");
  const hero = document.getElementById("hero");

  function show(msg) {
    toast.textContent = msg;
    toast.classList.add("show");
    setTimeout(() => toast.classList.remove("show"), 2200);
  }

  document.querySelectorAll("#thumbs button").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelectorAll("#thumbs button").forEach((b) => b.classList.remove("on"));
      btn.classList.add("on");
      hero.src = btn.dataset.src;
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

  function add(label) {
    countEl.textContent = String((parseInt(countEl.textContent, 10) || 0) + qty);
    show(label + " · Rs. " + (259 * qty).toLocaleString("en-IN"));
  }
  document.getElementById("add").addEventListener("click", () => add("Added to cart"));
  document.getElementById("buy").addEventListener("click", () => add("Buying now"));
  document.getElementById("copy").addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText("GLOW10");
    } catch {}
    show("Code GLOW10 copied");
  });
});
