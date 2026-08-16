document.addEventListener("DOMContentLoaded", () => {
  const shadeEl = document.getElementById("shade");
  const count = document.getElementById("count");
  const toast = document.getElementById("toast");
  const sheet = document.getElementById("sheet");

  function show(msg) {
    toast.textContent = msg;
    toast.classList.add("show");
    setTimeout(() => toast.classList.remove("show"), 2200);
  }
  function setShade(name) {
    shadeEl.textContent = name;
    document.querySelectorAll("#shades button").forEach((b) => {
      b.classList.toggle("on", b.dataset.name === name);
    });
  }

  document.querySelectorAll("#shades button").forEach((btn) => {
    btn.addEventListener("click", () => setShade(btn.dataset.name));
  });
  document.getElementById("finder").addEventListener("click", () => {
    sheet.hidden = false;
  });
  document.getElementById("closeFinder").addEventListener("click", () => {
    sheet.hidden = true;
    show("Shade set to " + shadeEl.textContent);
  });
  document.querySelectorAll(".finder-row button").forEach((btn) => {
    btn.addEventListener("click", () => setShade(btn.dataset.name));
  });
  sheet.addEventListener("click", (e) => {
    if (e.target === sheet) sheet.hidden = true;
  });
  document.getElementById("add").addEventListener("click", () => {
    count.textContent = String((parseInt(count.textContent, 10) || 0) + 1);
    show("Added FACEBRICK · " + shadeEl.textContent + " · Rs. 1,199");
  });
});
