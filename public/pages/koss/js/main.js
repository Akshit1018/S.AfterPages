document.addEventListener("DOMContentLoaded", () => {
  const hero = document.getElementById("hero");
  const price = document.getElementById("price");
  const stickyPrice = document.getElementById("stickyPrice");
  const count = document.getElementById("count");
  const toast = document.getElementById("toast");
  let qty = 1;
  let amount = 2550;

  const fmt = (n) => "₹ " + n.toLocaleString("en-IN") + ".00";
  function show(msg) {
    toast.textContent = msg;
    toast.classList.add("show");
    setTimeout(() => toast.classList.remove("show"), 2200);
  }
  function paint() {
    price.textContent = fmt(amount);
    stickyPrice.textContent = fmt(amount);
  }

  document.querySelectorAll("#thumbs button").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelectorAll("#thumbs button").forEach((b) => b.classList.remove("on"));
      btn.classList.add("on");
      hero.src = btn.dataset.src;
    });
  });

  document.querySelectorAll(".combo").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".combo").forEach((b) => b.classList.remove("on"));
      btn.classList.add("on");
      qty = Number(btn.dataset.qty);
      amount = Number(btn.dataset.price);
      paint();
    });
  });

  document.getElementById("change").addEventListener("click", () => {
    document.querySelectorAll(".combo").forEach((b) => b.classList.remove("on"));
    qty = 1;
    amount = 2550;
    paint();
    show("Reset to 1 × 30 ml");
  });

  document.getElementById("add").addEventListener("click", () => {
    count.textContent = String((parseInt(count.textContent, 10) || 0) + qty);
    show("Added " + qty + " · " + fmt(amount));
  });
});
