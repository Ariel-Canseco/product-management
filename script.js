let productos = JSON.parse(localStorage.getItem("productos")) || [];
let editIndex = null;

// GUARDAR (CREATE / UPDATE)
function guardarProducto() {
    let nombre = document.getElementById("nombre").value;
    let precio = document.getElementById("precio").value;

    if (nombre === "" || precio === "") {
        alert("Completa los campos");
        return;
    }

    let producto = { nombre, precio };

    if (editIndex === null) {
        productos.push(producto); // CREATE
    } else {
        productos[editIndex] = producto; // UPDATE
        editIndex = null;
    }

    localStorage.setItem("productos", JSON.stringify(productos));

    limpiarFormulario();
    mostrarProductos();
}

// MOSTRAR (READ)
function mostrarProductos() {
    let lista = document.getElementById("lista");
    lista.innerHTML = "";

    productos.forEach((prod, index) => {
        lista.innerHTML += `
            <div class="item">
                <span>${prod.nombre} - $${prod.precio}</span>
                <div>
                    <button onclick="editarProducto(${index})">Editar</button>
                    <button onclick="eliminarProducto(${index})">Eliminar</button>
                </div>
            </div>
        `;
    });
}

// EDITAR
function editarProducto(index) {
    document.getElementById("nombre").value = productos[index].nombre;
    document.getElementById("precio").value = productos[index].precio;
    editIndex = index;
}

// ELIMINAR (DELETE)
function eliminarProducto(index) {
    if (confirm("¿Eliminar producto?")) {
        productos.splice(index, 1);
        localStorage.setItem("productos", JSON.stringify(productos));
        mostrarProductos();
    }
}

// LIMPIAR FORM
function limpiarFormulario() {
    document.getElementById("nombre").value = "";
    document.getElementById("precio").value = "";
}

// INICIALIZAR
mostrarProductos();