'use strict'

var mongoose = require('mongoose');
var Schema= mongoose.Schema;

var floresTrazabilidadSchema= Schema({
    fecha:String,
    variedad:String,
    cama:String,
    lote:String,
    codigoTrabajador:String,
    empresa:String,
    sede:String
});

module.exports = mongoose.model('floresTrazabilidad',floresTrazabilidadSchema);



