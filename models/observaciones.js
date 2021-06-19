'use strict'

var mongoose = require('mongoose');
var Schema= mongoose.Schema;

var observacionSchema= Schema({
    fecha:String,
    empresa:String,
    sede:String,
    lote:String,
    observacion:String
});

module.exports = mongoose.model('observacion',observacionSchema);



