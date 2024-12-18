//Desplazamiento suave para la navegación. 
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetID = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetID);
        targetElement.scrollIntoView({
            behavior: 'Smooth'
        });
    });
});

//Array de productos
const productos = [
    { nombre: 'Biomecanica en Protesis Parcial Removible', descripción: 'El documento desarrolla los principios biomecanicos para el diseño funcional de una protesis parcial removible, de acuerdo a las caracteristicas anatomicas y funcionales del caso.', imagen: 'img/fuerzas-oclusales-bases-extension-distal.jpg' },
    { nombre: 'Biomecanica en Protesis Parcial Fija', descripción: 'El documento desarrolla los principios biomecanicos para el diseño funcional de una protesis parcial removible, de acuerdo a las caracteristicas anatomicas y funcionales del caso.', imagen: 'img/fuerzas-oclusales-bases-extension-distal.jpg' },
    { nombre: 'Clasificación de Kennedy', descripción: 'El documento desarrolla los principios biomecanicos para el diseño funcional de una protesis parcial removible, de acuerdo a las caracteristicas anatomicas y funcionales del caso.', imagen: 'img/fuerzas-oclusales-bases-extension-distal.jpg' },
    { nombre: 'Guia de ejercicios de Protesis Parcial Removible', descripción: 'El documento desarrolla los principios biomecanicos para el diseño funcional de una protesis parcial removible, de acuerdo a las caracteristicas anatomicas y funcionales del caso.', imagen: 'img/fuerzas-oclusales-bases-extension-distal.jpg' },
    { nombre: 'Sobre el Autor', descripción: 'El documento desarrolla los principios biomecanicos para el diseño funcional de una protesis parcial removible, de acuerdo a las caracteristicas anatomicas y funcionales del caso.', imagen: 'img/fuerzas-oclusales-bases-extension-distal.jpg' },
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
document.addEventListener('DOMContentLoaded', generarProductos);
    


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
