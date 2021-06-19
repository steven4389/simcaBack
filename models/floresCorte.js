'use strict'

var mongoose = require('mongoose');
var Schema= mongoose.Schema;

var floresCorteSchema= Schema({
    usuario:String,
    cantidad:String,
    empresa:String,
    sede:String,
    tiempoTrabajado:String,
    rendimiento:String,
    fechaInicial:String,
    fechaFinal:String,
    lote:String
});

module.exports = mongoose.model('floresCorte',floresCorteSchema);



