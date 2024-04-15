//traer mongoses

const { Schema, model } = require('mongoose');


//creamos el modelo
const modeloCita = Schema({

    nombre:String,
    correo:String,
    documento:String,
    sede:String,
    doctor:String,
    horario:String,
    hora:String,
    fechaCreacion:{
        type:Date,
        default: Date.now
    }

})


//exportamos modelo
module.exports = model('agendarCita', modeloCita, 'citas')