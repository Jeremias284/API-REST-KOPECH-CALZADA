const mongoose = require('mongoose');
const PatientSchema = require('../../models/patients');
//ACA ESTAN LOS METODOS O ACCIONES QUE SE PODRAN UTILIZAR PARA LA GESTION DE LOS PACIENTES

//OBTIENE TODOS LOS PACIENTES DE LA COLECCION
const getPatients = async (req, res) => {
    try {
        //FIND BUSCA TODOS LOS OBJETOS DENTRO DEL ESQUEMA
        //SE GUARDA EN CONSTANTE PARA ENVIARLO COMO RESPUESTA
        const response = await PatientSchema.find();
        
        return res.status(200).json(response);
        
    } catch (error) {
        return res.error(500).json({
            //ERROR EN TRUE PORQUE NO SE EJECUTO LA REQUEST
            error: true,
            message: 'internal server error'
        });
    }
};

const addPatient = async (req, res) => {
    try {
        if ( !req.body.name || !req.body.password) {
            return res.status(400).json({
              error: true,
              msg: 'Missing fields to create a patient',
            });
          }
          const patient = new PatientSchema(req.body);
          const newPatient = await patient.save();
      
          return res.status(201).json(newPatient);
        } catch (error) {
          return res.status(500).json({
            error: true,
            msg: 'Internal Server Error',
          });
    }
};


const logIn = async (req, res) => {
  try {
    const { name, password } = req.body;
    const foundValues = await PatientSchema.findOne({
      name,
      password,
    });
    if (foundValues) {
      res.status(200).json({});
    } else {
      res.status(400).json({ errors: ['Invalid name/password'] });
    }
  } catch (error) {
    return res.status(500).json({
      error: true,
      msg: 'Internal Server Error',
    });
  }
};

//ACTUALIZAR PACIENTE
const updatePatientById = async (req, res) => {
    try {
      if (
          //VERIFICA QUE NINGUNO DE LOS CAMPOS SEA NULO
        req.body.name === '' ||
        req.body.surname === '' 
      ) {
        return res.status(400).json({
            //ERROR INDICANDO QUE ALGUNOS DE LOS CAMPOS DEL OBJETO ES NULO
          error: true,
          message: 'Missing fields to update patient',
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
          message: `No patients with the id ${req.params.patientId}`,
        });
      }
  
      return res.status(201).json(patientUpdated);

    } catch (error) {
      return res.status(500).json({
        //ERROR EN TRUE PORQUE NO SE AGREGO EXITOSAMENTE
        error: true,
        message: 'internal server error',
      });
    }
  };


//ELIMINAR PACIENTE POR ID
const deletePatientById = async (req, res) => {
    try {
        const patientFound = await PatientSchema.findOneAndRemove({
            _id: req.params.patientId,
        })

        if (!patientFound || patientFound.length === 0) {
            return res.status(404).json({
              error: true,
              msg: `No student with the id ${req.params.patientId}`,
            });
          }
          return res.status(202).json(patientFound);
        } catch (error) {
          return res.status(500).json({
            error: true,
            msg: 'Internal Server Error',
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
                message: 'Could not get patient byId'
            })
        }

        //PETICION EXITOSA
        return res.status(200).json(response);
            //SI ES EXITOSO, MUESTRA LOS DATOS CONTENIDOS EN LA CONSTANTE

    } catch (error) {
        //NO SE PUDO INTERPRETAR LA REQUEST POR ERROR DE SINTAXIS
        return res.status(500).json({
            error: true,
            message: 'Could not get patient byID'
        });
        
    }
};

//EXPORTA LOS METODOS PARA PODER ACCEDER A ELLOS EN RUTAS
module.exports = {
    getPatients,
    updatePatientById,
    getPatientById,
    addPatient,
    deletePatientById,
    logIn,
};
