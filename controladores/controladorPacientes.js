
//importamos el modelo
const modeloPacientes = require('../modelos/registroPacientes');


//importar validator para validar
const validator = require('validator')




const registrarPacientes = (req, resp) => {

    /*---traer datos FRONT--*/
    const datosFront = req.body;
    



    // validacion de datos
    try{

         //validar datos
        let nombre           = validator.isEmpty( datosFront.nombre );
        let cedula           = validator.isEmpty( datosFront.cedula );
        let patologia        = validator.isEmpty( datosFront.patologia );
        let correo           = validator.isEmpty( datosFront.correo );
        let nombreFamiliar   = validator.isEmpty( datosFront.nombreFamiliar );
        let descripcion      = validator.isEmpty( datosFront.descripcion );


        if( nombre ||  cedula || patologia || correo || nombreFamiliar || descripcion){

            console.log('viene vacio')
           
        }

    }catch(error){

        return resp.status(400).json({
            status:"error",
            mensaje: "falta alguno de los datos",
            error
        })
    }




    //validar si existe
    modeloPacientes.find( {
        $or: [
            { cedula : datosFront.cedula },
            { correo : datosFront.correo }
        ]

    }).then( ( respuestaConsulta ) => {

        if(respuestaConsulta.length > 0){
        
           return resp.status(400).json({
                status:"error",
                mensaje: "El correo o la cedula del paciente ya existen"
           })
        
        }else{

            //guardar nuevo
            const modeloConFront = modeloPacientes(datosFront)
            modeloConFront.save()
                .then( (usuarioNuevo) => {
                    console.log(usuarioNuevo)

                    return resp.status(200).json({
                        status:"success",
                        mensaje:"El paciente se registro correctamente"
                    })
                } )
        }
        

    })




  



}



const listarPacientes = (req, resp) => {

    //ir a la base de datos a mostrar los registros
    modeloPacientes.find()
        .then( (todosLosPacientes) => {
            
            if( todosLosPacientes.length == 0){

                return resp.status(200).json({
                    status:"error",
                    mensaje:"No se encontraron registros",
                    todosLosPacientes
                })

            }else{

                return resp.status(200).json({
                    status:"success",
                    mensaje:"Datos encontrados",
                    todosLosPacientes
                })

            }

           
        })

}

const verUnSoloPaciente = (req, resp) => {

    //recibir id front
    const IDpacienteFront = req.params.id;
    

    if( IDpacienteFront.length < 2){
        
        return resp.status(400).json({
            mensaje:"No viene el id"
        })
    }


    //filtramos el id
    modeloPacientes.findOne( { _id : IDpacienteFront } )
            .then( (respuestaDB) => {
                
                return resp.status(200).json({
                    status:"seccess",
                    mensaje: "Se encontro el registro",
                    respuestaDB

                })
                
            
            }).catch( (error) => {
                
                return resp.status(400).json({
                    status: "error",
                    mensaje:"El registro no existe",
                })
            })

}



const actualizarUnPaciente = (req, resp) => {

    const IDpaciente = req.params.id;

    //recibir parametros body
    const infoFront = req.body;



    try{

        //validar campos
        let nombre         = validator.isEmpty(infoFront.nombre)
        let cedula         = validator.isEmpty(infoFront.cedula)
        let patologia      = validator.isEmpty(infoFront.patologia)
        let correo         = validator.isEmpty(infoFront.correo)
        let nombreFamiliar = validator.isEmpty(infoFront.nombreFamiliar)
        let descripcion    = validator.isEmpty(infoFront.descripcion)


        if( nombre || cedula   || patologia  || correo || nombreFamiliar  || descripcion  ){

            return resp.status(400).json({
                mensaje:"hay campos vacios"
            })
        }

    }catch(error){

        return resp.status(400).json({
            status: "error",
            mensaje:"los datos estan incompletos"
        })

    }

    


    
    //verificar en la base de datos
    modeloPacientes.findOneAndUpdate( { _id : IDpaciente}, infoFront )
            .then( (respDB) => {
            
                console.log(respDB)
                return resp.status(200).json({
                    status:"success",
                    mensaje: "El registro se actualizo correctamente"
                })
            
            }).catch( (error) => {

                return resp.status(400).json({
                    status  : "error",
                    mensaje : "No se Encontraron registros"
                })
            } )


}


const borrarPaciente = (req, resp) => {

    //obtener id registro
    const idFront = req.params.id;
    console.log(idFront)

    
    //borramos
    modeloPacientes.findOneAndDelete({ _id: idFront })
            .then( (respDB) => {

                return resp.status(200).json({
                    status:"success",
                    error:"El registro se ha borrado correctamente",
                    respDB
                })

            }).catch( (error) => {

                return resp.status(400).json({
                    status:"error",
                    mensaje:"El registro no fue encontrado"
                })
            } )

}


const buscarPorNombre = (req, resp) => {

    //obtener nombre url
    const cedFront = req.params.cedula

    modeloPacientes.find({ cedula: cedFront })
        .then( (respDB) => {
            
            if(respDB && respDB.length <= 0){
                
                return resp.status(400).json({
                    status: "error",
                    mensaje: "El registro no existe",
                })

            }else{

                return resp.status(200).json({
                    mensaje: "Se encontro el registro",
                    respDB
    
                })

            }

           

        })
}

module.exports = {

    registrarPacientes,
    listarPacientes,
    verUnSoloPaciente,
    actualizarUnPaciente,
    borrarPaciente,
    buscarPorNombre
}