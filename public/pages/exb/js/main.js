document.addEventListener("DOMContentLoaded", () => {
  const hero = document.getElementById("hero");
  const count = document.getElementById("count");
  const toast = document.getElementById("toast");
  const sheet = document.getElementById("sheet");
  let color = "Airforce blue";
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
      color = btn.dataset.name;
    });
  });
  document.querySelectorAll("#sizes button").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelectorAll("#sizes button").forEach((b) => b.classList.remove("on"));
      btn.classList.add("on");
      size = btn.textContent.trim();
    });
  });
  document.getElementById("copy").addEventListener("click", async () => {
    try { await navigator.clipboard.writeText("FIRST10"); } catch {}
    show("Code FIRST10 copied");
  });
  document.getElementById("add").addEventListener("click", () => {
    count.textContent = String((parseInt(count.textContent, 10) || 0) + 1);
    show("Added · " + color + " · " + size + " · ₹1,999");
  });
  document.getElementById("chart").addEventListener("click", () => { sheet.hidden = false; });
  document.getElementById("closeChart").addEventListener("click", () => { sheet.hidden = true; });
  sheet.addEventListener("click", (e) => { if (e.target === sheet) sheet.hidden = true; });
});
