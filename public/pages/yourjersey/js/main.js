document.addEventListener("DOMContentLoaded", () => {
  const hero = document.getElementById("hero");
  const count = document.getElementById("count");
  const toast = document.getElementById("toast");

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

  document.querySelectorAll("#sleeve button").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelectorAll("#sleeve button").forEach((b) => b.classList.remove("on"));
      btn.classList.add("on");
    });
  });

  document.querySelectorAll("[data-code]").forEach((btn) => {
    btn.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(btn.dataset.code);
      } catch {}
      show("Code " + btn.dataset.code + " copied");
    });
  });

  document.getElementById("add").addEventListener("click", () => {
    const name = document.getElementById("jname").value.trim() || "Custom";
    const num = document.getElementById("jnum").value.trim() || "—";
    const size = document.getElementById("size").value;
    const sleeve = document.querySelector("#sleeve .on").textContent;
    count.textContent = String((parseInt(count.textContent, 10) || 0) + 1);
    show("Added " + name + " #" + num + " · " + sleeve + " · " + size);
  });
});
