//importamos express para generar el router
const express   = require('express')
const usarRuta  =  express.Router();


//importar controlador
const controladorPacientes = require('../controladores/controladorPacientes')



/*---contruir rutas--*/
usarRuta.post('/registroPacientes', controladorPacientes.registrarPacientes);
usarRuta.get('/listarPacientes', controladorPacientes.listarPacientes );
usarRuta.get('/unPaciente/:id', controladorPacientes.verUnSoloPaciente );
usarRuta.put('/actulizarPaciente/:id', controladorPacientes.actualizarUnPaciente );
usarRuta.delete('/borrarPaciente/:id', controladorPacientes.borrarPaciente);
usarRuta.get('/buscarNombre/:cedula', controladorPacientes.buscarPorNombre)



//exportar rutas
module.exports = usarRuta
