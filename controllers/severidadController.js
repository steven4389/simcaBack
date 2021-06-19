'use strict'
var conversion = require('../Repository/conversion')
var moment = require('moment-timezone');
moment().format('MMMM Do YYYY, h:mm:ss a');

var severidad = require('../models/severidad');

var controller={

    create: function(req, res){console.log("entro")

        var Severidad = new severidad();

        var params = req.body;
        Severidad.fecha=params.fecha
        Severidad.empresa= params.empresa;
        Severidad.sede= params.sede;
        Severidad.severidad= params.severidad;
        Severidad.lote= params.lote;
        Severidad.plagayenfermedad= params.plagayenfermedad;
        Severidad.rango= params.rango;

        
        console.log(Severidad)

        Severidad.save((err, SeveridadStored)=>{
            if(err)return res.status(500).send({message: 'error en la peticion'});
            if(!SeveridadStored) return res.status(404).send({message: 'no se ha podido guardar'});

            return res.status(200).send({Severidad: SeveridadStored});
        });
    },

    

    obtener: function(req, res){
        
        //console.log(date)
        severidad.find({})
              .exec((err, severidadStored)=> {
                    if(err) return res.status(500).send({message: 'error al devolver los datos'});
                    if(!severidadStored) return res.status(404).send({message:'No hay insumos'});
                    
                    return res.status(200).send({severidadStored});
                });
    },

    consulta: function(req, res){
        console.log("estamos en la consulta")
        console.log(req.query.empresa)
        
        req.query.dateAfter= req.query.dateAfter.substr(0,8)
        console.log(req.query)

        severidad.find({'empresa': req.query.empresa, 'sede': req.query.sede})
                 .where('fecha').gt(req.query.dateBefore).lt(req.query.dateAfter)
                 .exec((err, severidadStored)=> {console.log(severidadStored)
                        if(err) return res.status(500).send({message: 'error al devolver los datos'});
                        if(!severidadStored) return res.status(404).send({message:'No hay floresCorte'});
                        return res.status(200).send({severidadStored});
                   });
    }


};

module.exports = controller;
