const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv/config');
const CONEXION_DB = process.env.DB_MONGODB;
const PORT = process.env.PORT || 7000;

const app = express();
const router = require('./routes');

app.use(express.json());
app.use('/api',router);
//Cors y 
app.use(cors());

//Uso del metodo de conexion de Mongoose
mongoose
.connect(CONEXION_DB)
.then(()=>{
    console.log('Base de datos conectada')
})
.catch((error)=>{
    console.log( `Base de datos no conectada: ${error}`)
});



app.listen(PORT, ()=>{
    console.log('Escuchando el ejemplo de API en',PORT );
});