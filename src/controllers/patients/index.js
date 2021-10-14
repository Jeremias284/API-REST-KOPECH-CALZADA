const { NativeError } = require('mongoose');
const PatientSchema = require('../../models/patients');
//ACA ESTAN LOS METODOS O ACCIONES QUE SE PODRAN UTILIZAR PARA LA GESTION DE LOS PACIENTES

//OBTIENE TODOS LOS PACIENTES DE LA COLECCION
const getPatients = async (req, res) => {
    try {
        //FIND BUSCA TODOS LOS OBJETOS DENTRO DEL ESQUEMA
        //SE GUARDA EN CONSTANTE PARA ENVIARLO COMO RESPUESTA
        const response = await PatientSchema.find();
        return res.status(200).json({
            //ENVIO DE LA CONSTANTE EN CASO DE OBTENER LA COLECCION DE PACIENTES
            data: response,
            //ERROR EN FALSO PORQUE SE EJECUTO CORRECTAMENTE
            error: false
        })
    } catch (error) {
        return res.error(400).json({
            //ERROR EN TRUE PORQUE NO SE EJECUTO LA REQUEST
            error: true,
            message: error
        });
    }
};

const addPatient = async (req, res) => {
    try {
        const patient = new PatientSchema(req.body);  
        //EL METODO SAVE GUARDA LOS OBJETOS DEL ESQUEMA EN LA DB
        //SE GUARDA EN CONSTANTE PARA ENVIARLO COMO RESPUESTA
        const newPatient = await patient.save();

        return res.status(201).json({
            //ENVIO DE LA CONSTANTE EN CASO DE AGREGAR UN PACIENTE
            data: newPatient,
            //ERROR EN FALSO PORQUE SE EJECUTO CORRECTAMENTE
            error: false  
        })

    } catch (error) {
        //STATUS 400 SIGNIFICA QUE NO SE PUDO EJECUTAR LA REQUEST POR UN ERROR DE SINTAXIS
        return res.status(400).json({
            //ERROR EN TRUE PORQUE NO SE AGREGO EXITOSAMENTE
            error: true,
            message: error
        });
        
    }
};

//ACTUALIZAR PACIENTE
const updatePatientById = async (req, res) => {
    try {
      if (
          //VERIFICA QUE NINGUNO DE LOS CAMPOS SEA NULO
        req.body.name === '' ||
        req.body.surname === '' ||
        req.body.surname === '' ||
        req.body.age === '' ||
        req.body.city === '' ||
        req.body.address === ''
      ) {
        return res.status(400).json({
            //ERROR INDICANDO QUE ALGUNOS DE LOS CAMPOS DEL OBJETO ES NULO
          error: true,
          msg: 'Missing fields to update patient',
        });
      }
      //EL METODO FIND_ONE_AND_UPDATE BUSCA EL OBJETO QUE TENGA EL ID INDICADO
      //SE GUARDA EN CONSTANTE PARA LUEGO ENVIARLO COMO RESPUESTA
      const patientUpdated = await PatientSchema.findOneAndUpdate(
        { _id: req.params.patientId },
        req.body,
        { new: true }
      );
  
      if (!patientUpdated || patientUpdated.length === 0) {
        return res.status(404).json({
          error: true,
          msg: `No patients with the id ${req.params.patientId}`,
        });
      }
  
      return res.status(201).json({
        //MODIFICACION EXITOSA, ENVIA COMO RESPUESTA LA CONSTANTE
        data: patientUpdated,
        error: false,
      });
    } catch (error) {
      return res.status(400).json({
        //ERROR EN TRUE PORQUE NO SE AGREGO EXITOSAMENTE
        error: true,
        msg: error,
      });
    }
  };


//ELIMINAR PACIENTE POR ID
const deletePatientById = async (req, res) => {
    try {
        //EL METODO FIND_ONE_AND_REMOVE SE USA PARA BUSCAR 1 ELEMENTO EN PARTICULAR (SEGUN ID) Y REMOVERLO ENTERO
        //SE GUARDA EN CONSTANTE PARA ENVIARLO COMO RESPUESTA
        const response = await PatientSchema.findOneAndRemove({_id: req.params.patientId});
        if(!response || response.length === 0) {
            //STATUS 404 SIGNIFICA QUE LA REQUEST NO ENCONTRO LO SOLICITADO
            return res.status(404).json({
                //ERROR EN TRUE PORQUE SE CUMPLE EL 404
                error: true,
                //MENSAJE DE ERROR
                message: 'paciente no encontrado'
            })
        }
        //202 PETICION RECIBIDA
        return res.status(202).json({
            data: response,
            error: false
        })
    } catch (error) {
        //NO SE PUDO INTERPRETAR LA REQUEST POR ERROR DE SINTAXIS
        return res.status(400).json({
            //ERROR EN TRUE PORQUE NO SE CUMPLIO LA REQUEST
            error: true,
            message: error
        });

    }
};

const getPatientById = async (req, res) => {
    try {
        //EL METODO FINDONE SE USA PARA BUSCAR 1 ELEMENTO EN PARTICULAR (SEGUN ID) 
        //SE GUARDA EN CONSTANTE PARA ENVIARLO COMO RESPUESTA
        const response = await PatientSchema.findOne({ _id: req.params.patientId})

        if(!response || response.length === 0) {
            //EL SERVIDOR NO ENCONTRO LO QUE LA REQUEST PRETENDIA
            return res.status(404).json({
                //ERROR EN TRUE PORQUE NO SE CUMPLIO
                error: true,
                //MENSAJE DE ERROR
                message: 'paciente no encontrado'
            })
        }

        //PETICION EXITOSA
        return res.status(200).json({
            //SI ES EXITOSO, MUESTRA LOS DATOS CONTENIDOS EN LA CONSTANTE
            data: response,
            error: false
        })

    } catch (error) {
        //NO SE PUDO INTERPRETAR LA REQUEST POR ERROR DE SINTAXIS
        return res.status(400).json({
            error: true,
            message: error
        });
        
    }
};

//EXPORTA LOS METODOS PARA PODER ACCEDER A ELLOS EN RUTAS
module.exports = {
    getPatients,
    updatePatientById,
    getPatientById,
    addPatient,
    deletePatientById
}