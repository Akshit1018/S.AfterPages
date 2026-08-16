document.addEventListener("DOMContentLoaded", () => {
  const hero = document.getElementById("hero");
  const count = document.getElementById("count");
  const toast = document.getElementById("toast");
  const sheet = document.getElementById("sheet");
  let size = "XS";

  function show(msg) {
    toast.textContent = msg;
    toast.classList.add("show");
    setTimeout(() => toast.classList.remove("show"), 2200);
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
      size = btn.textContent.trim();
    });
  });
  function add(label) {
    count.textContent = String((parseInt(count.textContent, 10) || 0) + 1);
    show(label + " · " + size + " · Rs. 8,449");
  }
  document.getElementById("add").addEventListener("click", () => add("Added to cart"));
  document.getElementById("buy").addEventListener("click", () => add("Buying now"));
  document.getElementById("book").addEventListener("click", () => show("Appointment request sent"));
  document.getElementById("chart").addEventListener("click", () => { sheet.hidden = false; });
  document.getElementById("closeChart").addEventListener("click", () => { sheet.hidden = true; });
  sheet.addEventListener("click", (e) => { if (e.target === sheet) sheet.hidden = true; });
});
