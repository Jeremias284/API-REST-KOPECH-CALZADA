const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv/config');

//VARIABLES DE ENTORNO
const CONEXION_DB = process.env.DB_MONGODB;
const PORT = process.env.PORT || 7000;

const app = express();
const router = require('./routes');

//PARA PERMITIR REQUESTS ENTRE ORIGENES CRUZADOS (EJ REQUESTS ENTRE LOCALHOST 5000 Y 8000)
app.use(cors());

app.use(express.json());
app.use('',router);



//Uso del metodo de conexion de Mongoose
mongoose
.connect(CONEXION_DB)
.then(()=>{
    //INDICARA ESTE MENSAJE EN LA CONSOLA SI SE PUDO CONECTAR A LA BASE DE DATOS
    console.log('Database connected')
})
.catch((error)=>{
    //INDICARA ESTE MENSAJE EN LA CONSOLA SI NO SE PUDO CONECTAR A LA BASE DE DATOS
    console.log( `Database not connected: ${error}`)
});

//MENSAJE DE QUE SE CONECTO AL SERVIDOR CORRECTAMENTE
//ESTE MENSAJE ES EL QUE SE MOSTRARA SI SE LOGRA CONECTAR EXITOSAMENTE EL REPOSITORIO CON HEROKU
app.get('/', (req, res) => {
    res.send('Server ok');
});

app.listen(PORT, ()=>{
    //SI LA CONEXION ES EXITOSA, MOSTRARA ESTE MENSAJE EN LA CONSOLA INDICANDO EN QUE PUERTO SE CONECTA
    console.log('Listening API example in',PORT );
});