const Patients = require('../../models/patients');

const getAllPatients = async (req, res) => {
  try {
    const response = await Patients.find();

    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      error: true,
      msg: 'Internal Server Error',
    });
  }
};

const getPatientById = async (req, res) => {
  try {
    const response = await Patients.findOne({ _id: req.params.id });

    if (!response || response.length === 0) {
      return res.status(404).json({
        error: true,
        msg: `No patient with the id of ${req.params.id}`,
      });
    }

    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      error: true,
      msg: 'Internal Server Error',
    });
  }
};

const createPatient = async (req, res) => {
  try {
    if (
      !req.body.name ||
      !req.body.surname ||
      !req.body.age ||
      !req.body.DNI ||
      !req.body.turns ||
      !req.body.doctor
    ) {
      return res.status(400).json({
        error: true,
        msg: 'Missing fields to create a patient',
      });
    }
    const patient = new Patients(req.body);
    const newPatient = await patient.save();

    return res.status(201).json(newPatient);
  } catch (error) {
    return res.status(500).json({
      error: true,
      msg: 'Internal Server Error',
    });
  }
};

const updatePatient = async (req, res) => {
  try {
    if (
      req.body.name === '' ||
      req.body.surname === '' 
    ) {
      return res.status(400).json({
        error: true,
        msg: 'Missing fields to update patient',
      });
    }
    const patientUpdated = await Patients.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );

    if (!patientUpdated || patientUpdated.length === 0) {
      return res.status(404).json({
        error: true,
        msg: `No patient with the id ${req.params.id}`,
      });
    }

    return res.status(201).json(patientUpdated);
  } catch (error) {
    return res.status(500).json({
      error: true,
      msg: 'Internal Server Error',
    });
  }
};

const deletePatient = async (req, res) => {
  try {
    const PatientFound = await Students.findOneAndRemove({
      _id: req.params.id,
    });

    if (!PatientFound || PatientFound.length === 0) {
      return res.status(404).json({
        error: true,
        msg: `No patient with the id ${req.params.id}`,
      });
    }

    return res.status(202).json(PatientFound);
  } catch (error) {
    return res.status(500).json({
      error: true,
      msg: 'Internal Server Error',
    });
  }
};

module.exports = {
  getAllPatients,
  getPatientById,
  createPatient,
  updatePatient,
  deletePatient,
};