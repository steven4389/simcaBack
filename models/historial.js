'use strict'

var mongoose = require('mongoose');
var Schema= mongoose.Schema;

var historialSchema= Schema({
    fecha:String,
    cantidad:Number,
    unidadMedida:String,
    nombre:String,
    proveedor:String,
    costo:Number,
    accion:String,
    lote:Number,
    CostoUnidad:Number,
    CostoUnidad:Number,
    empresa:String,
    sede:String,
    clasificacion:String
});

module.exports = mongoose.model('historial',historialSchema);