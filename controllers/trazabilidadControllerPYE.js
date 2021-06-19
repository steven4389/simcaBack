'use strict'
var conversion = require('../Repository/conversion')
var moment = require('moment-timezone');
//moment().format('MMMM Do YYYY, h:mm:ss a');

var trazabilidad = require('../models/trazabilidadPYE');

var controller={

    create: function(req, res){

        // let date = moment().tz("America/Bogota").format('YYYY.MM.DD HH:mm');
        // console.log(date)
        
        // date=conversion._getCadenaFecha(date);
        // console.log(date)

        console.log("entro")
        var Trazabilidad = new trazabilidad();

        var params = req.body;
        Trazabilidad.fecha= params.fecha;
        Trazabilidad.lote= params.lote;
        Trazabilidad.cama= params.cama;
        Trazabilidad.sitio= params.sitio;
        Trazabilidad.variedad= params.variedad;
        Trazabilidad.plagayenfermedad= params.plagayenfermedad;
        Trazabilidad.empresa= params.empresa;
        Trazabilidad.sede= params.sede;
        Trazabilidad.individuos= params.individuos;

        Trazabilidad.save((err, TrazabilidadStored)=>{
            if(err)return res.status(500).send({message: 'error en la peticion'});
            if(!TrazabilidadStored) return res.status(404).send({message: 'no se ha podido guardar'});

            return res.status(200).send({Trazabilidad: TrazabilidadStored});
        });
    },

    obtener: function(req, res){
       
        trazabilidad.find({})
              .exec((err, trazabilidad)=> {
                    if(err) return res.status(500).send({message: 'error al devolver los datos'});
                    if(!trazabilidad) return res.status(404).send({message:'No hay insumos'});
                    
                    return res.status(200).send({trazabilidad});
                });
    },

    consulta: function(req, res){
        console.log("estamos en la consulta")
        console.log(req.query.empresa)
        console.log(req.query.sede)
        trazabilidad.find({'empresa': req.query.empresa, 'sede': req.query.sede})
                    .where('fecha').gt(req.query.dateBefore).lt(req.query.dateAfter)
                  .exec((err, plagayenfermedad)=> {
                        if(err) return res.status(500).send({message: 'error al devolver los datos'});
                        if(!plagayenfermedad) return res.status(404).send({message:'No hay plagayenfermedad'});
                        return res.status(200).send({plagayenfermedad});
                   });
    }

};

module.exports = controller;