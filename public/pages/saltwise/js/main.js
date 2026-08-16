document.addEventListener("DOMContentLoaded", () => {
  const hero = document.getElementById("hero");
  const price = document.getElementById("price");
  const mrp = document.getElementById("mrp");
  const count = document.getElementById("count");
  const toast = document.getElementById("toast");
  let current = 35;

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

  document.querySelectorAll(".opt").forEach((opt) => {
    opt.addEventListener("click", () => {
      document.querySelectorAll(".opt").forEach((o) => o.classList.remove("on"));
      opt.classList.add("on");
      opt.querySelector("input").checked = true;
      current = Number(opt.dataset.price);
      price.textContent = "$" + Number(opt.dataset.price).toFixed(2);
      mrp.textContent = "$" + Number(opt.dataset.mrp).toFixed(2);
    });
  });

  document.getElementById("add").addEventListener("click", () => {
    count.textContent = String((parseInt(count.textContent, 10) || 0) + 1);
    show("Added · $" + current.toFixed(2));
  });
});
