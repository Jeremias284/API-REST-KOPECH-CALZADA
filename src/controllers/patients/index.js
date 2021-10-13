const PatientSchema = require('../../models/patients');

const getPatients = async (req, res) => {
    try {
        const response = await PatientSchema.find();
        return res.status(200).json({
            data: response,
            error: false
        })
    } catch (error) {
        return res.error(400).json({
            error: true,
            message: error
        });
    }
};

const addPatient = async (req, res) => {
    try {
        const patient = new PatientSchema(req.body);  
        const newPatient = await patient.save();

        return res.status(201).json({
            data: newPatient,
            error: false  
        })

    } catch (error) {
        return res.status(400).json({
            error: true,
            message: error
        });
        
    }
};

module.exports = {
    getPatients,
    addPatient
}