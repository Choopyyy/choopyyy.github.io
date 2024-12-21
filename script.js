
document.getElementById('menu-toggle').addEventListener('click', () => {
    document.querySelector('.menu-lateral').classList.toggle('open');
});

// Array de productos
const productos = [
    { id: 1, nombre: 'Biomecanica en PPR', descripcion: 'El documento desarrolla los principios biomecanicos...', imagen: 'img/fuerzas-oclusales-bases-extension-distal.jpg', precio: 50.00, archivo: 'Pdf/McKraken[2].pdf' },
    { id: 2, nombre: 'Biomecanica en PPF', descripcion: 'El documento desarrolla los principios biomecanicos...', imagen: 'img/componentes-ppf.gif', precio: 50.00, archivo: 'Pdf/McKraken[2].pdf' },
    { id: 3, nombre: 'Clasificación de Kennedy', descripcion: 'El documento desarrolla los principios biomecanicos...', imagen: 'img/clasificacion de kennedy.png', precio: 50.00, archivo: 'Pdf/oclusion-hector-alvarez-cantoni.pdf' },
    { id: 4, nombre: 'Guia de ejerccios PPR', descripcion: 'El documento desarrolla los principios biomecanicos...', imagen: 'img/guia de ejercicios.jpg', precio: 50.00, archivo: 'Pdf/370734849-Prostodoncia-Total-Sheldon-Winkler_compressed (1).pdf' },
    { id: 5, nombre: 'SOBRE EL AUTOR', descripcion: 'El documento desarrolla los principios biomecanicos...', imagen: 'img/AUTORA.jpg', precio: 50.00, archivo: 'Pdf/370734849-Prostodoncia-Total-Sheldon-Winkler_compressed (1).pdf' },
];

// Función para generar productos dinámicamente
function generarProductos() {
    const contenedor = document.querySelector('.elementos.container');
    contenedor.innerHTML = '';  // Limpiar contenido previo

    productos.forEach(producto => {
        const tarjeta = document.createElement('div');
        tarjeta.classList.add('product-cart');
        tarjeta.setAttribute('data-id', producto.id);  // Establecer el ID del producto
        tarjeta.setAttribute('data-name', producto.nombre);
        tarjeta.setAttribute('data-file', producto.archivo);  // Establecer archivo

        tarjeta.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}">
            <h3>${producto.nombre}</h3>
            <p>${producto.descripcion}</p> 
            <button class="add-to-cart">Ver más</button> 
        `;
        contenedor.appendChild(tarjeta);
    });
}

// Llamar a la función para generar los productos al cargar la página
document.addEventListener('DOMContentLoaded', generarProductos);

// Arreglo para almacenar los productos del carrito
let carrito = [];

document.addEventListener('DOMContentLoaded', () => {
    // Actualiza el carrito cuando la página se cargue
    actualizarCarrito();

    // Asocia los eventos de los botones de "Agregar al carrito"
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function() {
            const producto = {
                id: this.closest('.product-cart').getAttribute('data-id'),
                nombre: this.closest('.product-cart').getAttribute('data-name'),
                archivo: this.closest('.product-cart').getAttribute('data-file')
            };
            agregarAlCarrito(producto);
        });
    });
});

// Función para agregar al carrito
function agregarAlCarrito(producto) {
    // Verifica si el producto ya está en el carrito
    if (!carrito.some(item => item.id === producto.id)) {
        carrito.push(producto);
        actualizarCarrito(); 
        mostrarConfirmacion();
    }
}

function mostrarConfirmacion() {
    let confirmacion = document.getElementById("confirmacion-agregado");
    confirmacion.style.display = "block";
    setTimeout(() => {
        confirmacion.style.display = "none";
    }, 2000); 
}

function actualizarIcono() {
    document.getElementById("icono-cantidad").innerText = carrito.length;
}


// Función para actualizar la lista del carrito
function actualizarCarrito() {
    const carritoItems = document.getElementById('carrito-items');
    carritoItems.innerHTML = '';  // Limpiar elementos anteriores

    carrito.forEach(item => {
        // Crear un 'li' para cada producto
        const li = document.createElement('li');
        li.textContent = item.nombre;

        // Crear botón para eliminar el producto del carrito
        const botonEliminar = document.createElement('button');
        botonEliminar.textContent = "Eliminar";
        
        // Asociar el evento para eliminar el producto
        botonEliminar.addEventListener('click', function() {
            eliminarProducto(item.id);
        });

        // Añadir el botón de eliminar al 'li'
        li.appendChild(botonEliminar);

        // Añadir el 'li' al carrito
        carritoItems.appendChild(li);
    });
}

let totalCarrito = 0;

function actualizarTotal() {
    totalCarrito = carrito.reduce((total, item) => total + item.precio, 0);
    document.getElementById("total-carrito").innerText = totalCarrito.toFixed(2); 
}


// Función para eliminar un producto del carrito
function eliminarProducto(id) {
    carrito = carrito.filter(item => item.id !== id);
    actualizarCarrito();  // Actualizar el carrito después de eliminar un producto
}

// Función para vaciar el carrito
document.getElementById('vaciar-carrito').addEventListener('click', () => {
    carrito = [];
    actualizarCarrito();  // Limpiar la lista del carrito
});

// Función para descargar los archivos del carrito
document.getElementById('descargar-carrito').addEventListener('click', function() {
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
