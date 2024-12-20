// Desplazamiento suave para la navegación
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetID = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetID);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Array de productos
const productos = [
    { id: 1, nombre: 'Biomecanica en Protesis Parcial Removible', descripcion: 'El documento desarrolla los principios biomecanicos...', imagen: 'img/fuerzas-oclusales-bases-extension-distal.jpg', archivo: 'pdf/protesis_parcial_removible.pdf' },
    { id: 2, nombre: 'Biomecanica en Protesis Parcial Fija', descripcion: 'El documento desarrolla los principios biomecanicos...', imagen: 'img/componentes-ppf.gif', archivo: 'pdf/protesis_parcial_fija.pdf' },
    { id: 3, nombre: 'Clasificación de Kennedy', descripcion: 'El documento desarrolla los principios biomecanicos...', imagen: 'img/clasificacion de kennedy.png', archivo: 'pdf/clasificacion_kennedy.pdf' },
    { id: 4, nombre: 'Guía de ejercicios de Protesis Parcial Removible', descripcion: 'El documento desarrolla los principios biomecanicos...', imagen: 'img/guia de ejercicios.jpg', archivo: 'pdf/guia_ejercicios.pdf' },
    { id: 5, nombre: 'Sobre el Autor', descripcion: 'El documento desarrolla los principios biomecanicos...', imagen: 'img/AUTORA.jpg', archivo: 'pdf/sobre_autor.pdf' },
];

// Función para generar productos dinámicamente
function generarProductos() {
    const contenedor = document.querySelector('.elementos.container');
    contenedor.innerHTML = '';  // Limpiar contenido previo

    productos.forEach(producto => {
        const tarjeta = document.createElement('div');
        tarjeta.classList.add('product-card');
        tarjeta.setAttribute('data-id', producto.id);  // Establecer el ID del producto
        tarjeta.setAttribute('data-name', producto.nombre);
        tarjeta.setAttribute('data-file', producto.archivo);  // Establecer archivo

        tarjeta.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}">
            <h3>${producto.nombre}</h3>
            <p>${producto.descripcion}</p>
            <button class="add-to-cart">Agregar al carrito</button>
        `;
        contenedor.appendChild(tarjeta);
    });
}

// Llamar a la función para generar los productos al cargar la página
document.addEventListener('DOMContentLoaded', generarProductos);

// Carrito de compras
let carrito = [];

function actualizarCarrito() {
    const carritoItems = document.getElementById('carrito-items');
    carritoItems.innerHTML = '';

    carrito.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.nombre}`;
        carritoItems.appendChild(li);
    });
}

// Función para agregar productos al carrito
function agregarAlCarrito(producto) {
    if (!carrito.some(item => item.id === producto.id)) {
        carrito.push(producto);
        actualizarCarrito();
    }
}

// Mostrar detalles del producto
function mostrarDetalles(id) {
    const producto = productos.find(prod => prod.id === id);
    if (producto) {
        alert(`Detalles de ${producto.nombre}: ${producto.descripcion}`);
    }
}

// Eliminar producto del carrito
function eliminarProducto(id) {
    carrito = carrito.filter(item => item.id !== id);
    actualizarCarrito();
}

// Vaciar carrito
document.getElementById('vaciar-carrito').addEventListener('click', () => {
    carrito = [];
    actualizarCarrito();
});

// Función para descargar los archivos en el carrito
function descargarCarrito() {
    if (carrito.length === 0) {
        alert("El carrito está vacío. Agrega productos para descargar.");
        return;
    }

    const zip = new JSZip();

    carrito.forEach(item => {
        fetch(item.archivo)
            .then(response => response.blob())
            .then(blob => {
                zip.file(item.nombre + '.pdf', blob);
                if (carrito.indexOf(item) === carrito.length - 1) {
                    zip.generateAsync({ type: 'blob' })
                        .then(content => {
                            const a = document.createElement('a');
                            a.href = URL.createObjectURL(content);
                            a.download = 'carrito_descarga.zip';
                            a.click();
                        });
                }
            });
    });
}

// Event listener para agregar productos al carrito
document.querySelectorAll('.add-to-card').forEach(button => {
    button.addEventListener('click', function() {
        const producto = {
            id: this.parentElement.getAttribute('data-id'),
            nombre: this.parentElement.getAttribute('data-name'),
            archivo: this.parentElement.getAttribute('data-file')
        };
        agregarAlCarrito(producto);
    });
});

// Event listener para descargar el carrito
document.getElementById('descargar-carrito').addEventListener('click', function() {
    descargarCarrito();
});

// Validación de formulario de contacto
document.querySelector('form').addEventListener('submit', function(event) {
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Validación de campos vacíos
    if (!name || !email) {
        alert('Por favor, llena todos los campos requeridos.');
        event.preventDefault();
    } else if (!emailRegex.test(email)) {
        alert('Por favor, introduce un email válido.');
        event.preventDefault();
    }
});

