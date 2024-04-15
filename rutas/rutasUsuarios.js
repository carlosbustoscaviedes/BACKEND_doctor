// para usar las rutas usamos express
const express = require('express');

const usarRuta = express.Router();



// importamos el controlador
const controladorUsuarios = require('../controladores/usuarios')



/*----crear rutas---*/
usarRuta.post('/registroUsuarios', controladorUsuarios.registroUsuarios);
usarRuta.post('/loginUsuarios', controladorUsuarios.loginUsuarios )



module.exports = usarRuta
