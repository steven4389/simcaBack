'use strict'

var mongoose = require('mongoose');
var Schema= mongoose.Schema;

var especiesSiembraSchema= Schema({
    fecha:String,
    codigoTrabajador:String,
    lote:String,
    cama:String,
    densidadLote:String,
    cubetaCama:String,
    variedad:String,
    empresa:String,
    sede:String
});

module.exports = mongoose.model('especiesSiembra',especiesSiembraSchema);



