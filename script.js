//Formulario de contacto: Validación de campos antes de enviarlo.
// Validar formulario antes de enviarlo
document.querySelector('form').addEventListener('submit', function(event) {
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    // Validación de campos 
    if (!name || !email) {
        alert('Por favor, llena todos los campos requeridos.');
        event.preventDefault();  // Evitar que el formulario se envíe
    } else if (!emailRegex.test(email)) {
        alert('Por favor, introduce un email válido.');
        event.preventDefault();  // Evitar que el formulario se envíe
    }
});
