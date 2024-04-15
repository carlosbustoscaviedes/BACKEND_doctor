////importar schema y model

const { Schema, model } = require('mongoose');



/*--onstruimos el modelo--*/
const modeloPacientes = Schema({

    nombre:{
        type:String,
        required:true
    },
    cedula:{
        type:String,
        required:true
    },
    edad:String,
    tipoSangre: String,
    patologia:{
        type:String,
        required:true
    },
    ciudad:String,
    direccion: String,
    telefono:String,
    correo: {
        type:String,
        required:true
    },
    nombreFamiliar:{
        type:String,
        required:true
    },
    telefonoFamiliar:String,
    descripcion:{
        type:String,
        required:true
    }

})


module.exports = model('registroPacientes', modeloPacientes, 'pacientes')
