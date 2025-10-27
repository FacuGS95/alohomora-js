// pre entrega 1

// [function simuladorAlohomoraStore() {
//   let casa;
//   let repetir = true;

//   const gryffindor = "Gryffindor";
//   const hufflepuff = "Hufflepuff";
//   const ravenclaw = "Ravenclaw";
//   const slytherin  = "Slytherin";

//   while (repetir) {
//     let seleccion = prompt(
//       "Bienvenid@ a Hogwarts, ¿A qué casa de Hogwarts perteneces?: \n1. Gryffindor \n2. Hufflepuff \n3. Ravenclaw \n4. Slytherin");

//     switch (seleccion) {
//       case "1":
//         casa = gryffindor;
//         break;
//       case "2":
//         casa = hufflepuff;
//         break;
//       case "3":
//         casa = ravenclaw;
//         break;
//       case "4":
//         casa = slytherin;
//         break;
//       default:
//         casa = "los Muggles";
//         break;
//     }

//     console.log("El usuario pertenece a la casa de " + casa);
//     alert("Bienvenid@ a la casa de " + casa);

//     if (casa === gryffindor) {
//       alert("¡Eres valiente y audaz!");
//     } else if (casa === hufflepuff) {
//       alert("¡Eres leal y trabajador!");
//     } else if (casa === ravenclaw) {
//       alert("¡Eres inteligente y sabio!");
//     } else if (casa === slytherin) {
//       alert("¡Eres astuto y ambicioso!");
//     } else {
//       alert("¡Eres un muggle!");
//     }

//     repetir = confirm("¿Querés volver a elegir una casa?");
//   }
// }
// simuladorAlohomoraStore();]

// pre entrega 2


function Producto(id, nombre, precio, categoria) {
  this.id = id;
  this.nombre = nombre;
  this.precio = precio;
  this.categoria = categoria;
}

const productos = [
  new Producto(1, "Varita de Saúco", 2500, "Gryffindor"),
  new Producto(5, "Capa de Invisibilidad", 3000, "Gryffindor"),
  new Producto(6, "Espada de Godric Gryffindor", 4000, "Gryffindor"),
  new Producto(2, "Poción Multijugos", 1800, "Slytherin"),
  new Producto(7, "Anillo de Slytherin", 2200, "Slytherin"),
  new Producto(9, "Báculo de Salazar Slytherin", 3500, "Slytherin"),
  new Producto(8, "Diadema de Ravenclaw", 2700, "Ravenclaw"),
  new Producto(3, "Mapa del Merodeador", 3200, "Ravenclaw"),
  new Producto(10, "Pluma de Fénix", 2000, "Ravenclaw"),
  new Producto(11, "Sombrero Seleccionador", 2300, "Hufflepuff"),
  new Producto(12, "Escoba Nimbus 2000", 2800, "Hufflepuff"),
  new Producto(4, "Copa de Helga", 1500, "Hufflepuff")
];

document.addEventListener("DOMContentLoaded", () => {
  const casaSelect = document.getElementById("casa-select");
  const confirmarBtn = document.getElementById("confirmar-casa");
  const mensajeCasa = document.getElementById("mensaje-casa");
  const irTienda = document.getElementById("ir-tienda");

  if (confirmarBtn) {
    confirmarBtn.addEventListener("click", () => {
      const casa = casaSelect.value;
      if (!casa) {
        mensajeCasa.textContent = "Seleccioná una casa.";
        return;
      }
      localStorage.setItem("casaSeleccionada", casa);
      mensajeCasa.innerHTML = `Bienvenid@ a <strong>${casa}</strong>`;
      irTienda.style.display = "inline-block";
    });
  }

  const confirmarCompraBtn = document.getElementById("confirmar-compra");
  const mensajeConfirmacion = document.getElementById("mensaje-confirmacion");

  if (confirmarCompraBtn) {
    confirmarCompraBtn.addEventListener("click", () => {
      if (carritoIds.length === 0) {
        mensajeConfirmacion.textContent = "Tu carrito está vacío. Agregá productos antes de confirmar.";
        return;
      }

      const total = carritoIds
        .map(id => productos.find(p => p.id === id))
        .reduce((acc, prod) => acc + prod.precio, 0);

      mensajeConfirmacion.innerHTML = `
        ✅ ¡Compra confirmada! Total: <strong>$${total}</strong><br>
        Gracias por tu compra, ${localStorage.getItem("casaSeleccionada")} 🧙‍♀️
      `;

      carritoIds = [];
      localStorage.removeItem("carritoIds");
      renderizarCarrito();
    });
  }
});

const saludoCasa = document.getElementById("saludo-casa");
const listaProductos = document.getElementById("lista-productos");
const listaCarrito = document.getElementById("lista-carrito");
const vaciarCarritoBtn = document.getElementById("vaciar-carrito");

let carritoIds = (localStorage.getItem("carritoIds") || "").split(",").filter(Boolean).map(Number);

function renderizarSaludo() {
  const casa = localStorage.getItem("casaSeleccionada");
  if (saludoCasa && casa) {
    saludoCasa.textContent = `🧙‍♂️ Bienvenid@ a la tienda, ${casa}`;
  }
}

function renderizarProductos() {
  if (!listaProductos) return;
  listaProductos.innerHTML = "";

  const casa = localStorage.getItem("casaSeleccionada");
  const filtrados = productos.filter(p => p.categoria === casa);

  filtrados.forEach(prod => {
    const div = document.createElement("div");
    div.classList.add("producto");
    div.innerHTML = `
      <h4>${prod.nombre}</h4>
      <p>Precio: $${prod.precio}</p>
      <button data-id="${prod.id}">Agregar al carrito</button>
    `;
    listaProductos.appendChild(div);
  });

  obtenerNombresDeProductos();
}

function obtenerNombresDeProductos() {
  const casa = localStorage.getItem("casaSeleccionada");
  const resumenDiv = document.getElementById("resumen-productos");

  if (!resumenDiv || !casa) return;

  const nombres = productos
    .filter(p => p.categoria === casa)
    .map(p => p.nombre);

  resumenDiv.innerHTML = `
    <p><strong>Productos disponibles para ${casa}:</strong></p>
    <ul>
      ${nombres.map(nombre => `<li>${nombre}</li>`).join("")}
    </ul>
  `;
}

function renderizarCarrito() {
  if (!listaCarrito) return;
  listaCarrito.innerHTML = "";

  if (carritoIds.length === 0) {
    listaCarrito.innerHTML = "<p>Carrito vacío</p>";
    return;
  }

  carritoIds.forEach(id => {
    const item = productos.find(p => p.id === id);
    const div = document.createElement("div");
    div.classList.add("item-carrito");
    div.innerHTML = `
      <strong>${item.nombre}</strong> - $${item.precio}
      <button class="eliminar" data-id="${item.id}">Eliminar</button>
    `;
    listaCarrito.appendChild(div);
  });
}

function agregarAlCarrito(id) {
carritoIds.push(id);
localStorage.setItem("carritoIds", carritoIds.join(","));
renderizarCarrito();
  }


function eliminarDelCarrito(id) {
  carritoIds = carritoIds.filter(itemId => itemId !== id);
  localStorage.setItem("carritoIds", carritoIds.join(","));
  renderizarCarrito();
}

if (vaciarCarritoBtn) {
  vaciarCarritoBtn.addEventListener("click", () => {
    carritoIds = [];
    localStorage.removeItem("carritoIds");
    renderizarCarrito();
  });
}

document.addEventListener("click", e => {
  if (e.target.matches("button[data-id]") && !e.target.classList.contains("eliminar")) {
    agregarAlCarrito(Number(e.target.dataset.id));
  }

  if (e.target.matches(".eliminar")) {
    eliminarDelCarrito(Number(e.target.dataset.id));
  }
})    

renderizarSaludo();
renderizarProductos();
renderizarCarrito();