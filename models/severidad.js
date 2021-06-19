'use strict'

var mongoose = require('mongoose');
var Schema= mongoose.Schema;

var severidadSchema= Schema({
    fecha:String,
    empresa:String,
    sede:String,
    severidad:Number,
    lote:Number,
    plagayenfermedad:String,
    rango:String
});

module.exports = mongoose.model('severidad', severidadSchema);



