const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv/config');

const CONEXION_DB = process.env.DB_MONGODB;
const PORT = process.env.PORT || 5000;

const app = express();

//Cors
app.use(cors());


//Uso del metodo de conexion de Mongoose
mongoose
.connect(CONEXION_DB)
.then(()=>{
    console.log('Base de datos conectado')
})
.catch((error)=>{
    console.log( `Base de datos no conctada: ${error}`)
});



app.listen(PORT, ()=>{
    console.log('Escuchando el ejemplo de API en',PORT );
});