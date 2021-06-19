'use strict'

var mongoose = require('mongoose');
var Schema= mongoose.Schema;

var floresSiembraPlantasMadreschema= Schema({
  observaciones:String,
  enrraizamientoPlantasMadres:String,
  enrraizamientoProduccion:String,
  inventarioCosecha:Number,
  cosecha:String,
  cuartoFrio: String,
  variedad:String,
  fecha:String,
  empresa:String,
  sede:String,
});

module.exports = mongoose.model('floresSiembraPlantasMadres',floresSiembraPlantasMadreschema);

