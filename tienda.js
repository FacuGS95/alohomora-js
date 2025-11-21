document.addEventListener("DOMContentLoaded", () => {
  const saludoCasa = document.getElementById("saludo-casa");
  const listaProductos = document.getElementById("lista-productos");
  const listaCarrito = document.getElementById("lista-carrito");
  const confirmarCompraBtn = document.getElementById("confirmar-compra");
  const mensajeConfirmacion = document.getElementById("mensaje-confirmacion");

  let carritoIds = [];
try {
  const raw = localStorage.getItem("carritoIds");
  carritoIds = raw ? JSON.parse(raw) : [];
} catch (e) {
  console.warn("⚠️ carritoIds corrupto en localStorage:", localStorage.getItem("carritoIds"));
  localStorage.removeItem("carritoIds"); 
  carritoIds = [];
}
  let productos = [];
  
  

  if (saludoCasa && localStorage.getItem("casaSeleccionada")) {
    saludoCasa.textContent = `🧙‍♂️ Bienvenid@ a la tienda, ${localStorage.getItem("casaSeleccionada")}`;
  }

  fetch("./productos.json")
  .then(res => res.text())
  .then(textoPlano => {
    console.log("Contenido crudo:", textoPlano);
    const data = JSON.parse(textoPlano);
    productos = data.map(p => new Producto(p.id, p.nombre, p.precio, p.casa));
    renderizarProductos(productos);
    renderizarCarrito();
  })
  .catch(error => {
    console.error("Error al cargar productos:", error);
    listaProductos.innerHTML = "<p style='color:red'>❌ No se pudieron cargar los productos.</p>";
  });


  function Producto(id, nombre, precio, casa) {
    this.id = id;
    this.nombre = nombre;
    this.precio = precio;
    this.categoria = casa;
  }

  function renderizarProductos(lista) {
    const casa = localStorage.getItem("casaSeleccionada");
    if (!listaProductos || !casa) return;

    const filtrados = lista.filter(p => p.categoria === casa);
    listaProductos.innerHTML = "";

    filtrados.forEach(prod => {
      const div = document.createElement("div");
      div.classList.add("producto", prod.categoria.toLowerCase());
      div.innerHTML = `
        <h4>${prod.nombre}</h4>
        <p>Precio: $${prod.precio}</p>
        <button data-id="${prod.id}">Agregar al carrito</button>
      `;
      listaProductos.appendChild(div);
    });
  }

  function renderizarCarrito() {
    if (!listaCarrito) return;
    listaCarrito.innerHTML = "";

    if (carritoIds.length === 0) {
      listaCarrito.innerHTML = "<p>Carrito vacío</p>";
      return;
    }

    carritoIds.forEach(id => {
      const prod = productos.find(p => p.id === id);
      if (prod) {
        const div = document.createElement("div");
        div.classList.add("item-carrito");
        div.innerHTML = `
          <strong>${prod.nombre}</strong> - $${prod.precio}
          <button class="eliminar" data-id="${prod.id}">Eliminar</button>
        `;
        listaCarrito.appendChild(div);
      }
    });
  }

  document.addEventListener("click", e => {
    if (e.target.matches("button[data-id]") && !e.target.classList.contains("eliminar")) {
      const id = Number(e.target.dataset.id);
      carritoIds.push(id);
      localStorage.setItem("carritoIds", JSON.stringify(carritoIds));
      renderizarCarrito();
    }

    if (e.target.matches(".eliminar")) {
      const id = Number(e.target.dataset.id);
      carritoIds = carritoIds.filter(pid => pid !== id);
      localStorage.setItem("carritoIds", JSON.stringify(carritoIds));
      renderizarCarrito();
    }
  });

  if (confirmarCompraBtn) {
    confirmarCompraBtn.addEventListener("click", () => {
    
      if (carritoIds.length === 0) {
        mensajeConfirmacion.textContent = "Tu carrito está vacío. Agregá productos antes de confirmar.";
        return;
      }

      const total = carritoIds
        .map(id => productos.find(p => p.id === id))
        .reduce((acc, prod) => acc + prod.precio, 0);

        Swal.fire({
    title: 'Compra confirmada 🪄',
    text: `¡Gracias por tu pedido mágico! Total: $${total}`,
    icon: 'success',
    confirmButtonText: 'Aceptar'
  });


      mensajeConfirmacion.innerHTML = `
        ✅ ¡Compra confirmada! Total: <strong>$${total}</strong><br>
        Gracias por tu compra, ${localStorage.getItem("casaSeleccionada")} 🧙‍♀️
      `;

      carritoIds = [];
      localStorage.removeItem("carritoIds");
      renderizarCarrito();
    });
  }
  const vaciarCarritoBtn = document.getElementById("vaciar-carrito");

if (vaciarCarritoBtn) {
  vaciarCarritoBtn.addEventListener("click", () => {
    if (carritoIds.length === 0) {
      Swal.fire({
        title: 'Carrito vacío 🧹',
        text: 'No hay productos para eliminar',
        icon: 'info',
        confirmButtonText: 'Aceptar'
      });
      return;
    }

    carritoIds = [];
    localStorage.removeItem("carritoIds");
    renderizarCarrito();

    Swal.fire({
      title: 'Carrito vaciado 🧹',
      text: 'Todos los productos fueron eliminados',
      icon: 'success',
      confirmButtonText: 'Aceptar'
    });
  });
}
});