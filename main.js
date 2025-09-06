const fileInput = document.getElementById("file");
const status = document.getElementById("status");
const preview = document.getElementById("preview");
const nameEl = document.getElementById("name");
const typeEl = document.getElementById("type");
const sizeEl = document.getElementById("size");
const dimsEl = document.getElementById("dims");

fileInput.addEventListener("change", () => {
  const file = fileInput.files[0];
  if (!file) return;

  nameEl.textContent = file.name;
  typeEl.textContent = file.type || "—";
  sizeEl.textContent = (file.size / 1024).toFixed(1) + " KB";

  if (!file.type.startsWith("image/")) {
    status.textContent = "❌ No es una imagen";
    status.className = "status bad";
    preview.hidden = true;
    dimsEl.textContent = "—";
    return;
  }

  status.textContent = "✔ Imagen válida";
  status.className = "status ok";

  const reader = new FileReader();
  reader.onload = () => {
    preview.src = reader.result;
    preview.hidden = false;
  };
  reader.readAsDataURL(file);

  preview.onload = () => {
    dimsEl.textContent = `${preview.naturalWidth} × ${preview.naturalHeight}px`;
  };
});
