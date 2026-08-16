document.addEventListener("DOMContentLoaded", () => {
  const hero = document.getElementById("hero");
  const toast = document.getElementById("toast");
  const sheet = document.getElementById("sheet");
  const stickySize = document.getElementById("stickySize");
  let size = "2.4";

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
  document.querySelectorAll("#designs button").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelectorAll("#designs button").forEach((b) => b.classList.remove("on"));
      btn.classList.add("on");
      hero.src = btn.dataset.src;
    });
  });
  document.querySelectorAll("#sizes button").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelectorAll("#sizes button").forEach((b) => b.classList.remove("on"));
      btn.classList.add("on");
      size = btn.textContent.trim();
      stickySize.textContent = size;
    });
  });
  document.getElementById("add").addEventListener("click", () => {
    show("Added Zigzag Zest · size " + size + " · Rs. 849");
  });
  document.getElementById("book").addEventListener("click", () => show("Appointment request sent"));
  document.getElementById("wa").addEventListener("click", () => show("Opening WhatsApp chat…"));
  document.getElementById("call").addEventListener("click", () => show("We'll call you shortly"));
  document.getElementById("chart").addEventListener("click", () => { sheet.hidden = false; });
  document.getElementById("closeChart").addEventListener("click", () => { sheet.hidden = true; });
  sheet.addEventListener("click", (e) => { if (e.target === sheet) sheet.hidden = true; });
});
