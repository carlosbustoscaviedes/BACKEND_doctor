// importamos express para usar el router
const express  = require('express');
const usarRuta = express.Router();



//traer el controlador
const controladorCitas = require('../controladores/controladorCitas')


//crear rutas
usarRuta.post('/registrarCita', controladorCitas.agendarCita)
usarRuta.get('/listarCitas', controladorCitas.obtenerCitas)
usarRuta.delete('/borrarCita/:id', controladorCitas.borrarUnaCita)
usarRuta.get('/buscarUnaCita/:cedula', controladorCitas.buscarUnaCita)
usarRuta.put('/reagendar/:id', controladorCitas.reAgendarCita)




//exportamos rutas
module.exports = usarRuta;
