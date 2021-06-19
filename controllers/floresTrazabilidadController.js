'use strict'
var conversion = require('../Repository/conversion')
var moment = require('moment-timezone');
moment().format('MMMM Do YYYY, h:mm:ss a');

var floresTrazabilidad = require('../models/floresTrazabilidad');

var controller={

    create: function(req, res){console.log("entro")
        // console.log(req)
        // let date = moment().tz("America/Bogota").format('YYYY.MM.DD HH:mm');
        // date=conversion._getCadenaFecha(date);
        // console.log(date)

        var FloresTrazabilidad = new floresTrazabilidad();

        var params = req.body;
        FloresTrazabilidad.fecha=params.fecha
        FloresTrazabilidad.variedad= params.variedad;
        FloresTrazabilidad.cama= params.cama;
        FloresTrazabilidad.lote= params.lote;
        FloresTrazabilidad.codigoTrabajador= params.codigoTrabajador;
        FloresTrazabilidad.empresa= params.empresa;
        FloresTrazabilidad.sede= params.sede;
        
        console.log(FloresTrazabilidad)

        FloresTrazabilidad.save((err, floresTrazabilidadStored)=>{
            if(err)return res.status(500).send({message: 'error en la peticion'});
            if(!floresTrazabilidadStored) return res.status(404).send({message: 'no se ha podido guardar'});

            return res.status(200).send({FloresTrazabilidad: floresTrazabilidadStored});
        });
    },

    

    obtener: function(req, res){
        
        //console.log(date)
        floresTrazabilidad.find({})
              .exec((err, floresTr)=> {
                    if(err) return res.status(500).send({message: 'error al devolver los datos'});
                    if(!floresTr) return res.status(404).send({message:'No hay insumos'});
                    
                    return res.status(200).send({floresTr});
                });
    },

    consulta: function(req, res){
        console.log("estamos en la consulta")
        console.log(req.query.empresa)
        console.log(req.query.sede)
        floresTrazabilidad.find({'empresa': req.query.empresa, 'sede': req.query.sede})
                          .where('fecha').gt(req.query.dateBefore).lt(req.query.dateAfter)
                  .exec((err, floresTrazabilidad)=> {console.log(floresTrazabilidad)
                        if(err) return res.status(500).send({message: 'error al devolver los datos'});
                        if(!floresTrazabilidad) return res.status(404).send({message:'No hay floresCorte'});
                        return res.status(200).send({floresTrazabilidad});
                   });
    }


};

module.exports = controller;
