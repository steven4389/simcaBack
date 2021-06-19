'use strict'

var mongoose = require('mongoose');
var Schema= mongoose.Schema;

var floresSiembrachema= Schema({
  fecha:String,
  codigoTrabajador:String,
  lote:String,
  cama:String,
  variedad:String,
  empresa:String,
  sede:String,
  dencidadLote:String,
  cubetaCama:String
});

module.exports = mongoose.model('floresSiembra',floresSiembrachema);