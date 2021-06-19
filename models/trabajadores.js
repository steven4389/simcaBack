'use strict'

var mongoose = require('mongoose');
var Schema= mongoose.Schema;

var trabajadoresSchema= Schema({
    cedula:String,
    nombre:String,
    codigo:String,
    empresa:String,
    sede:String,
    dependencia:String
});

module.exports = mongoose.model('trabajadores',trabajadoresSchema);



