document.addEventListener("DOMContentLoaded", () => {
  const state = { packPrice: 899, packMrp: 1150, qty: 1 };

  const qtyEl = document.getElementById("qty");
  const displayPrice = document.getElementById("displayPrice");
  const displayMrp = document.getElementById("displayMrp");
  const savePill = document.getElementById("savePill");
  const cartPrice = document.getElementById("cartPrice");
  const buyNow = document.getElementById("buyNow");
  const buyWas = document.getElementById("buyWas");
  const toast = document.getElementById("toast");

  function inr(n) {
    return "₹" + n.toLocaleString("en-IN");
  }
  function rs(n) {
    return "RS. " + n.toFixed(2);
  }
  function savePct(price, mrp) {
    return Math.round(((mrp - price) / mrp) * 100);
  }
  function total() {
    return state.packPrice * state.qty;
  }
  function totalMrp() {
    return state.packMrp * state.qty;
  }
  function paint() {
    const t = total();
    const m = totalMrp();
    displayPrice.textContent = inr(t);
    displayMrp.textContent = inr(m);
    savePill.textContent = "Save " + savePct(t, m) + "%";
    cartPrice.textContent = rs(t);
    buyNow.textContent = rs(t);
    buyWas.textContent = rs(m);
    qtyEl.textContent = String(state.qty);
  }

  document.querySelectorAll(".pack").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".pack").forEach((b) => b.classList.remove("on"));
      btn.classList.add("on");
      state.packPrice = Number(btn.dataset.price);
      state.packMrp = Number(btn.dataset.mrp);
      state.qty = 1;
      paint();
    });
  });

  document.getElementById("minus").addEventListener("click", () => {
    if (state.qty > 1) {
      state.qty -= 1;
      paint();
    }
  });
  document.getElementById("plus").addEventListener("click", () => {
    state.qty += 1;
    paint();
  });

  function showToast(msg) {
    toast.textContent = msg;
    toast.classList.add("show");
    setTimeout(() => toast.classList.remove("show"), 2200);
  }

  document.getElementById("add").addEventListener("click", () => {
    showToast("Added " + state.qty + " pack(s) · " + inr(total()));
  });
  document.getElementById("buy").addEventListener("click", () => {
    showToast("Checkout · " + inr(total()));
  });

  document.querySelectorAll(".copy").forEach((btn) => {
    btn.addEventListener("click", async () => {
      const code = btn.dataset.code || "";
      try {
        await navigator.clipboard.writeText(code);
      } catch {
        /* ignore */
      }
      const prev = btn.textContent;
      btn.textContent = "Copied";
      showToast("Code " + code + " copied");
      setTimeout(() => {
        btn.textContent = prev;
      }, 1400);
    });
  });

  document.querySelectorAll(".flavor").forEach((card) => {
    card.addEventListener("click", () => {
      document.querySelectorAll(".flavor").forEach((c) => c.classList.remove("on"));
      card.classList.add("on");
    });
  });

  let remaining = 14 * 60 + 34;
  const clock = document.getElementById("countdown");
  setInterval(() => {
    if (remaining <= 0) remaining = 14 * 60 + 34;
    remaining -= 1;
    const m = String(Math.floor(remaining / 60)).padStart(2, "0");
    const s = String(remaining % 60).padStart(2, "0");
    clock.textContent = m + ":" + s;
  }, 1000);

  paint();
});
