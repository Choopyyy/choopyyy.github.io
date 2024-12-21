
document.getElementById('menu-toggle').addEventListener('click', () => {
    document.querySelector('.menu-lateral').classList.toggle('open');
});

// Array de productos
const productos = [
    { id: 1, nombre: 'Biomecanica en PPR', descripcion: 'El diseño de la P.P.R debe permitirle ingresar al lugar de asentamiento, es decir lograr una correcta inserción, un asentamiento correcto y desde esa posición permitir una extracción sin trabas, independientemente de la acción de los retenedores, que deben retener pero no trabar.', imagen: 'img/fuerzas-oclusales-bases-extension-distal.jpg', precio: 50.00, archivo: 'Pdf/McKraken[2].pdf' },
    { id: 2, nombre: 'Biomecanica en PPF', descripcion: 'Hoy se puede considerar que la biomecánica de las prótesis consiste en su funcionamiento basado en tres principios: retención, soporte y estabilidad.', imagen: 'img/componentes-ppf.gif', precio: 50.00, archivo: 'Pdf/McKraken[2].pdf' },
    { id: 3, nombre: 'Clasificación de Kennedy', descripcion: 'La clasificación de arcadas de Kennedy es un sistema ampliamente utilizado en la práctica odontológica para describir los patrones de edentulismo parcial en los maxilares.', imagen: 'img/clasificacion de kennedy.png', precio: 50.00, archivo: 'Pdf/oclusion-hector-alvarez-cantoni.pdf' },
    { id: 4, nombre: 'Guia de ejerccios PPR', descripcion: 'El documento desarrolla los principios biomecanicos...', imagen: 'img/guia de ejercicios.jpg', precio: 50.00, archivo: 'Pdf/370734849-Prostodoncia-Total-Sheldon-Winkler_compressed (1).pdf' },
    { id: 5, nombre: 'SOBRE EL AUTOR', descripcion: 'Odontologo, especialista en Rehabilitación Oral. Docente universitaria.', imagen: 'img/AUTORA.jpg', precio: 50.00, archivo: 'Pdf/370734849-Prostodoncia-Total-Sheldon-Winkler_compressed (1).pdf' },
];

function generarProductos() {
    const contenedor = document.querySelector('.elementor.container');
    contenedor.innerHTML = '';  

    productos.forEach(producto => {
        const tarjeta = document.createElement('div');
        tarjeta.classList.add('product-card');
        tarjeta.setAttribute('data-id', producto.id);  
        tarjeta.setAttribute('data-name', producto.nombre);
        tarjeta.setAttribute('data-file', producto.archivo);  

        const detalles = document.createElement('div');
        detalles.classList.add('detalles-adicionales');
        detalles.innerHTML = `
            <p><strong>Precio:</strong> $${producto.precio}</p>
            <p><strong>Archivo PDF:</strong> <a href="${producto.archivo}" target="_blank">Descargar</a></p>
        `;
        detalles.style.display = 'none';  

        tarjeta.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}">
            <h3>${producto.nombre}</h3>
            <p>${producto.descripcion}</p> 
            <button class="ver-mas">Ver más</button> 
        `;
        
        tarjeta.appendChild(detalles); 
        contenedor.appendChild(tarjeta);

        // Agregar el evento al botón "Ver más"
        const botonVerMas = tarjeta.querySelector('.ver-mas');
        botonVerMas.addEventListener('click', () => {
            // Toggle para mostrar u ocultar los detalles
            const detallesElement = tarjeta.querySelector('.detalles-adicionales');
            const isVisible = detallesElement.style.display === 'block';
            detallesElement.style.display = isVisible ? 'none' : 'block';
        });
    });
}

generarProductos();

document.addEventListener('DOMContentLoaded', generarProductos);

let carrito = [];

document.addEventListener('DOMContentLoaded', () => {
    actualizarCarrito();
    document.querySelectorAll('.add-to-card').forEach(button => {
        button.addEventListener('click', function() {
            const producto = {
                id: this.closest('.product-card').getAttribute('data-id'),
                nombre: this.closest('.product-card').getAttribute('data-name'),
                archivo: this.closest('.product-card').getAttribute('data-file')
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



function actualizarCarrito() {
    const carritoItems = document.getElementById('carrito-items');
    carritoItems.innerHTML = '';  

    carrito.forEach(item => {
      
        const li = document.createElement('li');
        li.textContent = item.nombre;

     
        const botonEliminar = document.createElement('button');
        botonEliminar.textContent = "Eliminar";
        
   
        botonEliminar.addEventListener('click', function() {
            eliminarProducto(item.id);
        });

        li.appendChild(botonEliminar);

     
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
