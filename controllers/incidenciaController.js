'use strict'
var conversion = require('../Repository/conversion')
var moment = require('moment-timezone');
moment().format('MMMM Do YYYY, h:mm:ss a');

var incidencia = require('../models/incidencia');

var controller={

    create: function(req, res){console.log("entro")

        var Incidencia = new incidencia();

        var params = req.body;
        Incidencia.fecha=params.fecha
        Incidencia.empresa= params.empresa;
        Incidencia.sede= params.sede;
        Incidencia.incidencia= params.incidencia;
        Incidencia.lote= params.lote;
        Incidencia.plagayenfermedad= params.plagayenfermedad;
        Incidencia.rango= params.rango;

        
        console.log(Incidencia)

        Incidencia.save((err, IncidenciaStored)=>{
            if(err)return res.status(500).send({message: 'error en la peticion'});
            if(!IncidenciaStored) return res.status(404).send({message: 'no se ha podido guardar'});

            return res.status(200).send({Incidencia: IncidenciaStored});
        });
    },

    

    obtener: function(req, res){
        
        //console.log(date)
        incidencia.find({})
              .exec((err, incidenciaStored)=> {
                    if(err) return res.status(500).send({message: 'error al devolver los datos'});
                    if(!incidenciaStored) return res.status(404).send({message:'No hay insumos'});
                    
                    return res.status(200).send({incidenciaStored});
                });
    },

    consulta: function(req, res){
        console.log("estamos en la consulta")
        console.log(req.query.empresa)
        console.log(req.query)
        
        req.query.dateAfter= req.query.dateAfter.substr(0,8)
        console.log(req.query)

        incidencia.find({'empresa': req.query.empresa, 'sede': req.query.sede})
                  .where('fecha').gt(req.query.dateBefore).lt(req.query.dateAfter)
                  .exec((err, incidenciaStored)=> {console.log(incidenciaStored)
                        if(err) return res.status(500).send({message: 'error al devolver los datos'});
                        if(!incidenciaStored) return res.status(404).send({message:'No hay floresCorte'});
                        return res.status(200).send({incidenciaStored});
                   });
    }

    


};

module.exports = controller;
