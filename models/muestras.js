'use strict'

var mongoose = require('mongoose');
var Schema= mongoose.Schema;

var muestrasSchema= Schema({
    fecha:String,
    empresa:String,
    sede:String,
    muestras:String,
    lote:String
});

module.exports = mongoose.model('muestras',muestrasSchema);



