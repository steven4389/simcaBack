'use strict'

var mongoose = require('mongoose');
var Schema= mongoose.Schema;

var incidenciaSchema= Schema({
    fecha:String,
    empresa:String,
    sede:String,
    incidencia:Number,
    lote:Number,
    plagayenfermedad:String,
    rango:String
});

module.exports = mongoose.model('incidencia', incidenciaSchema);



