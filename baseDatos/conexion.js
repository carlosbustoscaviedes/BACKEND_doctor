/*---importar mongoose----*/
const mongoose = require('mongoose');


/*----conectarmos a la bse de datos-----*/
const conexionDB = async() => {

    try{

        await mongoose.connect('mongodb+srv://CABUSTOSC09:Ecoutores09@haltfone.to2o8np.mongodb.net/halftone?retryWrites=true&w=majority&appName=haltfone');

        

        console.log("se ha conectado correctamente a la base de datos");

    }catch(err){

        console.log("no se pudo conectar la base de datos" , err)
    }

}

        
        
    
module.exports =  { 
    conexionDB 
};


   