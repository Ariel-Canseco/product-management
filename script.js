class App {
    constructor() {
        this.productos = JSON.parse(localStorage.getItem("productos")) || [];
        this.editId = null;
        this.mostrar();
    }

    generarId() {
        return Date.now();
    }

    guardar() {
        let nombre = document.getElementById("nombre").value.trim();
        let precio = parseFloat(document.getElementById("precio").value);

        if (!nombre || isNaN(precio)) {
            this.toast("Completa correctamente los campos");
            return;
        }

        if (nombre.length < 3) {
            this.toast("El nombre debe tener al menos 3 caracteres");
            return;
        }

        if (precio <= 0) {
            this.toast("El precio debe ser mayor a 0");
            return;
        }

        if (this.editId) {
            this.productos = this.productos.map(p =>
                p.id === this.editId ? { ...p, nombre, precio } : p
            );
            this.toast("Producto actualizado");
            this.editId = null;
        } else {
            this.productos.push({
                id: this.generarId(),
                nombre,
                precio
            });
            this.toast("Producto agregado");
        }

        this.persistir();
        this.limpiar();
        this.mostrar();
    }

    mostrar(lista = this.productos) {
        let contenedor = document.getElementById("lista");
        contenedor.innerHTML = "";

        lista.forEach(p => {
            contenedor.innerHTML += `
                <div class="item">
                    <span>${p.nombre} - $${p.precio}</span>
                    <div>
                        <button onclick="app.editar(${p.id})">✏️</button>
                        <button onclick="app.eliminar(${p.id})">🗑️</button>
                    </div>
                </div>
            `;
        });
        document.getElementById("contador").innerText =
        "Total productos: " + lista.length;
    }

    editar(id) {
        let prod = this.productos.find(p => p.id === id);
        document.getElementById("nombre").value = prod.nombre;
        document.getElementById("precio").value = prod.precio;
        this.editId = id;
    }

    eliminar(id) {
        if (confirm("¿Eliminar producto?")) {
            this.productos = this.productos.filter(p => p.id !== id);
            this.persistir();
            this.mostrar();
            this.toast("Producto eliminado");
        }
    }

    filtrar() {
        let texto = document.getElementById("buscar").value.toLowerCase();
        let min = document.getElementById("min").value;
        let max = document.getElementById("max").value;

        let filtrados = this.productos.filter(p => {
            let cumpleTexto = p.nombre.toLowerCase().includes(texto);
            let cumpleMin = min ? p.precio >= min : true;
            let cumpleMax = max ? p.precio <= max : true;
            return cumpleTexto && cumpleMin && cumpleMax;
        });

        this.mostrar(filtrados);
    }

    persistir() {
        localStorage.setItem("productos", JSON.stringify(this.productos));
    }

    limpiar() {
        document.getElementById("nombre").value = "";
        document.getElementById("precio").value = "";
    }

    toast(msg) {
        let toast = document.getElementById("toast");
        toast.innerText = msg;
        toast.style.display = "block";
        setTimeout(() => toast.style.display = "none", 2000);
    }
}

function toggleDark() {
    document.body.classList.toggle("dark");
}

const app = new App();