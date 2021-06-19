'use strict'

var mongoose = require('mongoose');
var Schema= mongoose.Schema;

var loteCortadoSchema= Schema({
    fecha:String,
    empresa:String,
    sede:String,
    loteCortado:String,
});

module.exports = mongoose.model('loteCortado',loteCortadoSchema);



