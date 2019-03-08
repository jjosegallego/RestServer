//cargo la configuracion de host y puerto
require('./config/config');

//se instancian los complementos express y mongoose
const express = require('express');
const mongoose = require('mongoose');

//se ejecuta el express 
const app = express();

//configuracion para recibir parametros en el body del servicio
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//se optienen los api rest
app.use(require('./routes/usuario'));


//Conexión con BD
mongoose.connect(process.env.URLDB, { useNewUrlParser: true, useCreateIndex: true },
    (err, res) => {
        if (err) throw err;
        console.log('Base de datos conectada');
    });

//se abre socket
app.listen(process.env.PORT, () => {
    console.log('server is connected');
})