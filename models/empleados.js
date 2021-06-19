'use strict'

var mongoose = require('mongoose');
var Schema= mongoose.Schema;

var empleadosSchema= Schema({
    cedula:String,
    nombre:String,
    entrada1:String,
    salida1:String,
    entrada2:String,
    salida2:String,
    horasTrabajadas:String,
    empresa:String,
    sede:String,
    dependencia:String
});

module.exports = mongoose.model('empleados',empleadosSchema);



