//!en el front

import axios from 'axios'; // Asegúrate de tener axios instalado

const handleLogin = async () => {
  const username = 'nombredeusuario'; // Reemplaza con el nombre de usuario ingresado por el usuario
  const password = 'contraseña'; // Reemplaza con la contraseña ingresada por el usuario

  try {
    const response = await axios.post('/api/login', {
      username: username,
      password: password,
    });

    // El servidor responderá con información sobre si la autenticación fue exitosa o no.
    if (response.data.success) {
      // Autenticación exitosa, realiza acciones adicionales (por ejemplo, redirige al usuario)
    } else {
      // Autenticación fallida, muestra un mensaje de error o realiza otras acciones apropiadas
    }
  } catch (error) {
    console.error('Error de autenticación:', error);
  }
};


//!en el back
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');

app.use(bodyParser.json());

// Ruta para manejar la autenticación
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;

  // Busca el usuario en la base de datos por su nombre de usuario
  // Aquí debes realizar una consulta a tu base de datos para obtener la contraseña almacenada correspondiente al nombre de usuario

  // Compara la contraseña ingresada con la contraseña almacenada en la base de datos
  // Utiliza bcrypt.compare para hacer la comparación segura
  const match = await bcrypt.compare(password, storedPassword); // Cambia storedPassword por la contraseña almacenada en la base de datos

  if (match) {
    // Autenticación exitosa
    res.json({ success: true, message: 'Autenticación exitosa' });
  } else {
    // Autenticación fallida
    res.json({ success: false, message: 'Autenticación fallida' });
  }
});

// Inicia el servidor en un puerto (por ejemplo, el puerto 3001)
app.listen(3001, () => {
  console.log('Servidor en funcionamiento en el puerto 3001');
});
