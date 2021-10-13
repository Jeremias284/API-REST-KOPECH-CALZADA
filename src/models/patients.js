const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
    //ESQUEMA DE COMO SE COMPONE CADA ELEMENTO DEL ESQUEMA JUNTO CON SU VALIDACION
    name: {
        type: String,
        required: [true, 'name is required'],
    },
    surname: {
        type: String,
        required: [true, 'surname is required'],
    },
    age: {
        type: Number, 
        required: [true, 'age is required'],
    },
    city: {
        type: String,
        required: [true, 'city is required'],
    },
    address: {
        type: String,
        required: [true, 'address is required'],
    },  
    
    
});


module.exports = mongoose.model('Patient', patientSchema);