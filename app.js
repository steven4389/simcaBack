'use strict'

var express= require('express');
var bodyParser= require('body-parser');
var path= require('path');

var app=express();

//cargar archivos de rutas
var insumos_routes= require('./routes/insumosRoute');
//var insumos_routes= require('./routes/loginRoutes');

//middlewares
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());


// var cors= require('cors');
// app.use(cors({
//     origin:'http://localhost:4200'
// }));
// Configurar cabeceras y cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

//rutas
 app.use('/', express.static('clientDev', {redirect:false}));
app.use('/api', insumos_routes);

 app.get('*', function(req, res, next){  
      res.sendFile(path.resolve('../clientDev/dist/clientDev/index.html'));   
 });

//export
module.exports= app;