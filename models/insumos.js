'use strict'

var mongoose = require('mongoose');
var Schema= mongoose.Schema;

var insumosSchema= Schema({
    nombre:String,
    proveedor:String,
    cantidad:Number,
    unidadMedida:String,
    costo:Number,
    empresa:String,
    sede:String,
    clasificacion:String
});

module.exports = mongoose.model('insumos',insumosSchema);