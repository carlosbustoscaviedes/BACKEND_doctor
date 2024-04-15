
//importamos validator
const validator = require('validator')

//importamos el modelo
const modeloCitas = require('../modelos/agendarCita');






const agendarCita = (req, resp) => {

   //traemos informacion del body FRONT
   const datosFront = req.body
   

   //validacion
   try{
        let nombre     = validator.isEmpty( datosFront.nombre );
        let correo     = validator.isEmpty( datosFront.correo );
        let documento  = validator.isEmpty( datosFront.documento );
        let sede       = validator.isEmpty( datosFront.sede );
        let doctor     = validator.isEmpty( datosFront.doctor );
        let horario    = validator.isEmpty( datosFront.horario );
        let hora       = validator.isEmpty( datosFront.hora );


        if( nombre || correo || documento || sede || doctor || horario || hora){

            return resp.status(400).json({
                mensaje:"falta algun campo"
            })
        }

   }catch(error){

        return resp.status(400).json({
            mensaje:"los datos estan incompletos"
        }) 

   }
  


   //revisar que no halla citas de ese usuario para el mismo dia
   modeloCitas.find({
    $or:[
       
        { documento : datosFront.documento }


        
    ]
   
}).then( (respDB) => {

    console.log(respDB)
    if(respDB.length > 0){
        
        //verificar si la hora es igual
        return resp.status(400).json({
                mensaje:"No puede agendar otra cita hasta que cumpla la que tiene pendiente"
            })
        

    }else{

        //armar modelo y guardar
        const llenarModelo = new modeloCitas(datosFront)
        llenarModelo.save()
                .then( (respRegistro) => {
                    
                    return resp.status(200).json({
                        status:"success",
                        mensaje: "Se ha registrado su cita correctamente",
                        respRegistro
                    })
                
                }).catch( (error) => {
                    console.log(error)
                } )

    }


})


}


const reAgendarCita = (req, resp) => {

    //obtner id
    const idFront = req.params.id

    //body
    const bodyFront = req.body


    //filtramos
    modeloCitas.findOneAndUpdate( { _id:idFront  }, bodyFront )
        .then( (respDB) => {

            return resp.status(200).json({
                status:"success",
                mensaje : "se ha actualizado correctamente",
                respDB
            })
        })


}

const obtenerCitas = (req, resp) => {

    //filtra base de datos
    modeloCitas.find()
        .then( (respDB) => {
            
            return resp.status(200).json({
                status:"success",
                mensaje: "se encontraron registros",
                respDB

            })
       
        }).catch( (error) => {

            console.log("no hay citas")
        })

}


const borrarUnaCita = (req, resp) => {

    const idFront = req.params.id

    //filtrar base datos
    modeloCitas.findOneAndDelete( { _id : idFront } )
            .then( (respDB) => {

                if(!respDB){

                    return resp.status(400).json({
                        mensaje:"se registro no existe",
                        respDB
                    })

                }


                return resp.status(200).json({
                    mensaje:"se ha borrado correctamente",
                    respDB
                })
           
            }).catch( (error) => {
                
              
            })
   
}


const buscarUnaCita = (req, resp) => {


    //obtener id front
    const idFront = req.params.cedula
    
    if(idFront.length <= 2){

        return resp.status(400).json({
            mensaje: "no viene parametros"
        })
    }



    //filtrar cita
    modeloCitas.findOne( { documento : idFront } )
            .then( (respDB) => {
                
                return resp.status(200).json({
                    status:"Success",
                    mensaje:"se ha encontrado el registro",
                    respDB
                })

               
            
            }).catch( (error) => {
                
                return resp.status(400).json({
                    status:"error",
                    mensaje:"el dato no existe en la base de datos"
                })
            } )
}









//exportar modulo
module.exports = {

    agendarCita,
    obtenerCitas,
    borrarUnaCita,
    buscarUnaCita,
    reAgendarCita

}