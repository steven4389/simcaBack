'use strict'

var mongoose = require('mongoose');
var Schema= mongoose.Schema;

var trazabilidadSchema= Schema({
    fecha:String,
    lote:String,
    cama:String,
    sitio:String,
    variedad:String,
    plagayenfermedad:String,
    empresa:String,
    sede:String,
    individuos:String
});

module.exports = mongoose.model('trazabilidadPYE',trazabilidadSchema);



