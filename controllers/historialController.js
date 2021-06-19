'use strict'

var historial = require('../models/historial');

var controller={

    saveHistorial: function(req, res){
        console.log("entro")
        var Historial = new historial();

        var params = req.body;
        Historial.nombre= params.nombre;
        Historial.proveedor= params.proveedor;
        Historial.cantidad= params.cantidad;
        Historial.unidadMedida= params.unidadMedida;
        Historial.fecha= params.fecha;
        Historial.costo= params.costo
        Historial.CostoUnidad= params.CostoUnidad,
        Historial.accion= params.accion
        Historial.empresa= params.empresa
        Historial.CostoUnidad= params.Historial
        Historial.sede= params.sede
        Historial.clasificacion= params.clasificacion
        if(params.lote){
            Historial.lote= parseInt(params.lote);
        }

        Historial.save((err, HistorialStored)=>{
            if(err)return res.status(500).send({message: 'error en la peticion'});
            if(!HistorialStored) return res.status(404).send({message: 'no se ha podido guardar'});

            return res.status(200).send({Historial: HistorialStored});
        });
    },

    getHistorial: function(req, res){
        historial.find({}).exec((err, Historial)=> {
            if(err) return res.status(500).send({message: 'error al devolver los datos'});
            if(!Historial) return res.status(404).send({message:'No hay Historials'});
            return res.status(200).send({Historial});
        });
    },


    deleteHistorial: function(req, res){
        //mongoose.connection.db.dropCollection('historial', function(err, result) {...});
        //historial.collection.drop()
        historial.deleteMany({empresa: req.query.empresa, sede: req.query.sede}, function(err, data) {
            if (err) {
              done(err);
              return res.status(500).send({message:'error al eliminar el historial'});
            } else {
              //done(null, data);
              return res.status(200).send({message:'historial borrado'});
            }
          })
        
        
    },

    consulta: function(req, res){
        console.log("estamos en la consulta")
        console.log(req.query.empresa)
        console.log(req.query.sede)
         historial.find({'empresa': req.query.empresa, 'sede': req.query.sede})
                  .where('fecha').gt(req.query.dateBefore).lt(req.query.dateAfter)
                  .exec((err, Historial)=> {
                        if(err) return res.status(500).send({message: 'error al devolver los datos'});
                        if(!Historial) return res.status(404).send({message:'No hay Historials'});
                        return res.status(200).send({Historial});
                   });
    }

};

module.exports = controller;