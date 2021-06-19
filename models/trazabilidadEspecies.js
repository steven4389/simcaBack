'use strict'

var mongoose = require('mongoose');
var Schema= mongoose.Schema;

var trazabilidadSchema= Schema({
    fecha:String,
    lote:String,
    cama:String,
    variedad:String,
    codigoTrabajador:String,
    empresa:String,
    sede:String,
    codigoTrazabilidad:String
});

module.exports = mongoose.model('trazabilidadEspecies',trazabilidadSchema);



