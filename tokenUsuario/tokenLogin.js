// importa jwt
const jwt = require('jwt-simple');

/*--importar moment--*/
const moment = require('moment')



/*--clave secreta---*/
const claveSecreta = "Ecoutores09"


/*---funcion con objeto--*/
const tokenUsuarios = ( usuariosDB ) => {

    const datosUsuario = {

        nombre : usuariosDB.nombre,
        correo : usuariosDB.correo,
        pass   : usuariosDB.pass,
        creacion : moment().unix(),
        finalizacion : moment().add(60, "days").unix
        
    }

   return jwt.encode(datosUsuario, claveSecreta)
    
}





module.exports = {

    tokenUsuarios
}