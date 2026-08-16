document.addEventListener("DOMContentLoaded", () => {
  let qty = 1;
  const qtyEl = document.getElementById("qty");
  const countEl = document.getElementById("count");
  const toast = document.getElementById("toast");
  const hero = document.getElementById("hero");
  const colorName = document.getElementById("colorName");
  const skuSize = document.getElementById("skuSize");

  function show(msg) {
    toast.textContent = msg;
    toast.classList.add("show");
    setTimeout(() => toast.classList.remove("show"), 2200);
  }

  document.querySelectorAll("#swatches .sw").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelectorAll("#swatches .sw").forEach((b) => b.classList.remove("on"));
      btn.classList.add("on");
      hero.src = btn.dataset.src;
      colorName.textContent = btn.dataset.name;
    });
  });

  document.querySelectorAll("#sizes button").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelectorAll("#sizes button").forEach((b) => b.classList.remove("on"));
      btn.classList.add("on");
      skuSize.textContent = btn.textContent.trim();
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
    countEl.textContent = String((parseInt(countEl.textContent, 10) || 0) + qty);
    show("Added " + qty + " · Rs. " + (942 * qty).toLocaleString("en-IN"));
  });

  const sheet = document.getElementById("sheet");
  document.getElementById("chart").addEventListener("click", () => {
    sheet.hidden = false;
  });
  document.getElementById("closeChart").addEventListener("click", () => {
    sheet.hidden = true;
  });
  sheet.addEventListener("click", (e) => {
    if (e.target === sheet) sheet.hidden = true;
  });

  let left = 4 * 86400 + 12 * 3600 + 41 * 60 + 44;
  const pad = (n) => String(n).padStart(2, "0");
  setInterval(() => {
    if (left <= 0) left = 4 * 86400;
    left -= 1;
    document.getElementById("d").textContent = pad(Math.floor(left / 86400));
    document.getElementById("h").textContent = pad(Math.floor((left % 86400) / 3600));
    document.getElementById("m").textContent = pad(Math.floor((left % 3600) / 60));
    document.getElementById("s").textContent = pad(left % 60);
  }, 1000);
});
