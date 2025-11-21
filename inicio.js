document.addEventListener("DOMContentLoaded", () => {
  const casaSelect = document.getElementById("casa-select");
  const confirmarBtn = document.getElementById("confirmar-casa");
  const mensajeCasa = document.getElementById("mensaje-casa");
  const irTienda = document.getElementById("ir-tienda");

  confirmarBtn.addEventListener("click", () => {
    const casa = casaSelect.value;
    if (!casa) {
      mensajeCasa.textContent = "Seleccioná una casa.";
      return;
    }
    localStorage.setItem("casaSeleccionada", casa);
    mensajeCasa.innerHTML = `Bienvenid@ a <strong>${casa}</strong>`;
    irTienda.classList.add("visible");
  });

  irTienda.addEventListener("click", () => {
    window.location.href = "./tienda.html";
  });
});