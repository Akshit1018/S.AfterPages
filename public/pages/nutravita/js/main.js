document.addEventListener("DOMContentLoaded", () => {
  let qty = 1;
  const unit = 1199;
  const qtyEl = document.getElementById("qty");
  const priceEl = document.getElementById("price");
  const countEl = document.getElementById("count");
  const toast = document.getElementById("toast");

  function paint() {
    qtyEl.textContent = String(qty);
    priceEl.textContent = (unit * qty).toLocaleString("en-IN");
  }
  function show(msg) {
    toast.textContent = msg;
    toast.classList.add("show");
    setTimeout(() => toast.classList.remove("show"), 2200);
  }

  document.getElementById("minus").addEventListener("click", () => {
    if (qty > 1) {
      qty -= 1;
      paint();
    }
  });
  document.getElementById("plus").addEventListener("click", () => {
    qty += 1;
    paint();
  });
  document.getElementById("add").addEventListener("click", () => {
    countEl.textContent = String((parseInt(countEl.textContent, 10) || 0) + qty);
    show("Added " + qty + " · ₹" + (unit * qty).toLocaleString("en-IN"));
  });
  document.getElementById("bundle").addEventListener("click", () => {
    countEl.textContent = String((parseInt(countEl.textContent, 10) || 0) + 1);
    show("Bundle added · ₹2,157");
  });
  paint();
});
