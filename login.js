// Registro de usuario
document.getElementById('registerForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;

    const response = await fetch('https://bikelike.onrender.com/auth/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    });

    const data = await response.json();
    console.log(data);

    if (response.ok) {
        alert('Registro exitoso! Puedes iniciar sesión ahora.');
        document.getElementById('registerForm').reset(); // Limpia el formulario de registro
    } else {
        alert(data.message || 'Error al registrar el usuario');
    }
});

// Inicio de sesión
document.getElementById('loginForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    const response = await fetch('https://bikelike.onrender.com/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    });

    const data = await response.json();
    console.log(data);

    // Verifica si el inicio de sesión fue exitoso
    if (response.ok) {
        const { token } = data; // Extrae el token del response
        localStorage.setItem('token', token); // Almacena el token en el localStorage
        window.location.href = 'contenido.html'; // Cambia a la ruta de tu página destino
    } else {
        // Muestra un mensaje de error si el inicio de sesión falla
        switch (response.status) {
            case 404:
                alert('Usuario no encontrado. Por favor verifica tu email.');
                break;
            case 401:
                alert('Contraseña incorrecta. Intenta nuevamente.');
                break;
            default:
                alert(data.message || 'Error en el inicio de sesión');
        }
    }
});
