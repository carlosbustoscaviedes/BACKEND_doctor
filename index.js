// llamar conexion
const { conexionDB } = require('./baseDatos/conexion');
conexionDB();


/*--configurar express--*/
const express = require('express');
const usarExpress = express();

const cors = require('cors')


/*----configurar datos que vienen del FRONT---*/
usarExpress.use( express.json() );
usarExpress.use( express.urlencoded( { extended: true } ) )



//configurar cors
usarExpress.use( cors() )




//importar rutas
const rutasUsuarios  = require('./rutas/rutasUsuarios');
const rutasPacientes = require('./rutas/rutasPacientes');
const rutasCitas     = require('./rutas/rutasCitas')

usarExpress.use(rutasUsuarios);
usarExpress.use(rutasPacientes)
usarExpress.use(rutasCitas)







/*-------------crear servidor----------*/
usarExpress.listen( 3000, () => {
    console.log("servidor corriendo")
})


