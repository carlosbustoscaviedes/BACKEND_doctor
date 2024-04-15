//importar mongoose para insertar la colleccion
const { Schema, model } = require('mongoose');



/*---construir modelo usuario----*/
const modeloUsuario = Schema({

    nombre: {
        type:String,
        required : true
    },
    correo: {
        type:String,
        required : true
    },
    pass: {
        type:String,
        required : true

    },
    fecha : {
        type:Date,
        default: Date.now
    }
    
})


// exportamos modelo

module.exports = model('registroUsuario', modeloUsuario, "usuarios");
