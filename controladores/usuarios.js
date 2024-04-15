//----importar modelo

const modeloUsuarios = require('../modelos/registroUsuarios');

const validator = require('validator');

const bcrypt = require('bcrypt');


//importar token
const token = require('../tokenUsuario/tokenLogin')






const registroUsuarios = (req, resp) => {


    //obtener informacion por body
    const datosFront = req.body;




    /*---validaciones---*/
    if( !datosFront.nombre || !datosFront.correo || !datosFront.pass ){

       console.log("alguno de los campos esta incompleto");
       return false
    
    }



  //verificar que exista
   modeloUsuarios.find( {
        $or : [
            { correo  : datosFront.correo }
        ]
   })
   .then( (usuario) => {// si existe verificar que tenga mas de 0 letras

        if(usuario && usuario.length > 0){
            
            return resp.status(200).json({
                status:"error",
                mensaje: "el usuario ya existe"
            })

        }

       
        //cifrar clave
        bcrypt.hash( datosFront.pass, 10, (error,  claveCifrada ) => {

            datosFront.pass = claveCifrada
            console.log(claveCifrada)


            // crear modelo , meter datos y guardar
            const modeloGuardar = new modeloUsuarios(datosFront)
            modeloGuardar.save()
                .then( (registro) => {
                    
                    return resp.status(200).json({
                        status:"success",
                        mensaje: "El usuario se ha registrado correctamente",
                        registro
                    })

                })

        })

   }).catch( (error) => {
    console.log(error)
   })


    console.log("campos completos")


}


const loginUsuarios = (req, resp) => {
    
    //obtener informacion
    const datosFront = req.body;
   


    //validaciones
    try{

        let correo = !validator.isEmpty(datosFront.correo);
        let pass   = !validator.isEmpty(datosFront.pass)

        if( !correo || !pass ){

            console.log("alguno esta vacio");
        }

    }catch(error){
        
        return resp.status(400).json({
            status:"error",
            mensaje:"falta algun campo"
        })
    }
 
        

    //validar si existe el email
    modeloUsuarios.findOne({ correo :  datosFront.correo })
                .then( (respDB) => {
                    
                        //validar si existeemail
                        if( !respDB ){
                            return resp.status(400).json({
                                status:"error",
                                mensaje:"el correo no existe"
                            })
                        }

                        //validar contraseña
                        const pass = bcrypt.compareSync( datosFront.pass, respDB.pass );
                        if( !pass ){
                            return resp.status(400).json({
                                status:"error",
                                mensaje: "la contraseña no es valida"
                            })
                        }

                    
                    //generar token
                    const tokenUsuario = token.tokenUsuarios(respDB)
                    

                    return resp.status(200).json({
                        status:"success",
                        mensaje:"Hola " + respDB.nombre + " Bienvenido",
                        respDB,
                        token: tokenUsuario
                      
                    })
                
                })
   

   
   
   

    
    
}



module.exports = {

    registroUsuarios,
    loginUsuarios

}
