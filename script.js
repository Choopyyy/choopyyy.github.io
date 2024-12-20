//Desplazamiento suave para la navegación. 
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetID = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetID);
        if (targetElement) {
        targetElement.scrollIntoView({
            behavior: 'Smooth'
            });
        }
    });
});

//Array de productos
const productos = [
    { nombre: 'Biomecanica en Protesis Parcial Removible', descripcion: 'El documento desarrolla los principios biomecanicos para el diseño funcional de una protesis parcial removible, de acuerdo a las caracteristicas anatomicas y funcionales del caso.', imagen: 'img/fuerzas-oclusales-bases-extension-distal.jpg' },
    { nombre: 'Biomecanica en Protesis Parcial Fija', descripcion: 'El documento desarrolla los principios biomecanicos para el diseño funcional de una protesis parcial removible, de acuerdo a las caracteristicas anatomicas y funcionales del caso.', imagen: 'img/componentes-ppf.gif' },
    { nombre: 'Clasificación de Kennedy', descripcion: 'El documento desarrolla los principios biomecanicos para el diseño funcional de una protesis parcial removible, de acuerdo a las caracteristicas anatomicas y funcionales del caso.', imagen: 'img/clasificacion de kennedy.png' },
    { nombre: 'Guia de ejercicios de Protesis Parcial Removible', descripcion: 'El documento desarrolla los principios biomecanicos para el diseño funcional de una protesis parcial removible, de acuerdo a las caracteristicas anatomicas y funcionales del caso.', imagen: 'img/guia de ejercicios.jpg' },
    { nombre: 'Sobre el Autor', descripcion: 'El documento desarrolla los principios biomecanicos para el diseño funcional de una protesis parcial removible, de acuerdo a las caracteristicas anatomicas y funcionales del caso.', imagen: 'img/AUTORA.jpg' },
];

function generarProductos() {
    const contenedor  = document.querySelector('.elementos.container');
    contenedor.innerHTML = '';

    productos.forEach(producto => {
        const tarjeta = document.createElement('div');
        tarjeta.classList.add('product-card');
        tarjeta.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}">
            <h3>${producto.nombre}</h3>
            <p>${producto.descripcion}</p>
            <button class="ver-detalles">Ver detalles</button>
        `;
        contenedor.appendChild(tarjeta);
    });
}

// Llamar a la función para generar los productos al cargar la página
document.addEventListener('DOMContentLoaded', function() {
    generarProductos();  // Llamar a la función de generación de productos cuando el DOM esté listo
});
    
let carrito = [];
function actualizarCarrito() {
    const carritoItems = document.getElementById('carrito-items');
    carritoItems.innerHTML = '';

    carrito.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.name}`;
        carritoItems.appendChild(li);
    });
}
// Función para agregar archivos al carrito
function agregarAlCarrito(producto) {
    // Verificar si el archivo ya está en el carrito
    if (!carrito.some(item => item.id === producto.id)) {
        carrito.push(producto);
        actualizarCarrito();
    }
}

// Función para descargar todos los archivos en el carrito
function descargarCarrito() {
    if (carrito.length === 0) {
        alert("El carrito está vacío. Agrega archivos para descargar.");
        return;
    }

    // Crear un archivo ZIP para contener todos los PDFs
    let zip = new JSZip();

    // Agregar cada archivo al ZIP
    carrito.forEach(item => {
        fetch(item.file)
            .then(response => response.blob())
            .then(blob => {
                zip.file(item.name, blob);
                if (carrito.indexOf(item) === carrito.length - 1) {
                    // Descargar el archivo ZIP cuando todos los archivos hayan sido agregados
                    zip.generateAsync({ type: 'blob' }).then(content => {
                        const link = document.createElement('a');
                        link.href = URL.createObjectURL(content);
                        link.download = "carrito_descarga.zip";
                        link.click();
                    });
                }
            });
    });
}

// Event listener para agregar productos al carrito
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', function() {
        const producto = {
            id: this.parentElement.getAttribute('data-id'),
            name: this.parentElement.getAttribute('data-name'),
            file: this.parentElement.getAttribute('data-file')
        };
        agregarAlCarrito(producto);
    });
});

// Event listener para descargar el carrito
document.getElementById('descargar-carrito').addEventListener('click', function() {
    descargarCarrito();
});
        

//Formulario de contacto: Validación de campos antes de enviarlo.
// Validar formulario antes de enviarlo
document.querySelector('form').addEventListener('submit', function(event) {
    
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    // Validación de campos vacios
    if (!name || !email) {
        alert('Por favor, llena todos los campos requeridos.');
        event.preventDefault();  // Evitar que el formulario se envíe
    } 
    else if (!emailRegex.test(email)) {
        alert('Por favor, introduce un email válido.');
        event.preventDefault();  // Evitar que el formulario se envíe
    }
});
