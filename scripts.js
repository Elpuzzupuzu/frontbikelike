// URL base de la API
const apiUrl = 'https://bikelike.onrender.com/bicicletas';

// Función para listar todas las bicicletas
async function listarBicicletas() {
    const token = localStorage.getItem('token'); // Obtener el token de localStorage

    const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` // Incluir el token en el encabezado
        }
    });

    // Verifica si el token ha caducado o es inválido
    if (response.status === 401 || response.status === 403) {
        alert('Tu sesión ha caducado. Por favor, inicia sesión de nuevo.');
        localStorage.clear(); // Vaciar el localStorage
        window.location.href = 'login.html'; // Cambia a la ruta de tu página de inicio de sesión
        return;
    }

    if (!response.ok) {
        // Manejo del error en otros códigos de error
        const errorData = await response.json();
        alert(`Error: ${errorData.message}`);
        return;
    }

    const bicicletas = await response.json();
    const tbody = document.querySelector("#tablaBicicletas tbody");
    tbody.innerHTML = '';

    // Asegúrate de que bicicletas sea un array
    if (Array.isArray(bicicletas)) {
        bicicletas.forEach(bici => {
            const row = `<tr>
                <td>${bici.id}</td>
                <td>${bici.marca}</td>
                <td>${bici.modelo}</td>
                <td>${bici.tipo}</td>
                <td>${bici.color}</td>
                <td>${bici.precio}</td>
            </tr>`;
            tbody.innerHTML += row;
        });
    } else {
        console.error('La respuesta no es un array:', bicicletas);
    }
}

// Función para agregar una nueva bicicleta
document.getElementById('formBici').addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevenir el comportamiento predeterminado del formulario

    const token = localStorage.getItem('token'); // Obtener el token de localStorage
    const marca = document.getElementById('marca').value;
    const modelo = document.getElementById('modelo').value;
    const tipo = document.getElementById('tipo').value;
    const tamaño = document.getElementById('tamaño').value;
    const color = document.getElementById('color').value;
    const precio = document.getElementById('precio').value;
    const material = document.getElementById('material').value;
    const peso = document.getElementById('peso').value;
    const cambio = document.getElementById('cambio').value;
    const disponible = document.getElementById('disponible').value === 'true'; // Convertir a booleano

    const nuevaBici = {
        marca,
        modelo,
        tipo,
        tamaño,
        color,
        precio,
        material,
        peso,
        cambio,
        disponible,
    };

    const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`, // Incluir el token en el encabezado
        },
        body: JSON.stringify(nuevaBici), // Enviar el objeto como JSON
    });

    if (response.ok) {
        alert('Bicicleta agregada exitosamente!');
        document.getElementById('formBici').reset(); // Limpia el formulario
        listarBicicletas(); // Recarga la lista de bicicletas
    } else {
        const errorData = await response.json();
        alert(`Error al agregar la bicicleta: ${errorData.message}`);
    }
});

// Llama a la función para listar bicicletas al cargar la página
listarBicicletas();
