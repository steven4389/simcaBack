'use strict'
var conversion = require('../Repository/conversion')
var moment = require('moment-timezone');
moment().format('MMMM Do YYYY, h:mm:ss a');

var floresCorte = require('../models/floresCorte');

var controller={

    create: function(req, res){
         console.log(req.body)
        // let date = moment().tz("America/Bogota").format('YYYY.MM.DD HH:mm');
        // date=conversion._getCadenaFecha(date);
        // console.log(date)
        let vector= conversion.Rendimiento(req.body.fechaInicial, req.body.fechaFinal, req.body.cantidad)

        var FloresCorte = new floresCorte();

        var params = req.body;
        FloresCorte.usuario= params.usuario;
        FloresCorte.cantidad= params.cantidad;
        FloresCorte.empresa= params.empresa;
        FloresCorte.sede= params.sede;
        FloresCorte.tiempoTrabajado= vector[0] + " horas " + vector[1] + " minutos";
        FloresCorte.rendimiento=vector[2];
        FloresCorte.fechaInicial=params.fechaInicial;
        FloresCorte.fechaFinal=params.fechaFinal;
        FloresCorte.lote= params.lote;
        
        console.log(FloresCorte)

        FloresCorte.save((err, floresStored)=>{
            if(err)return res.status(500).send({message: 'error en la peticion'});
            if(!floresStored) return res.status(404).send({message: 'no se ha podido guardar'});

            return res.status(200).send({FloresCorte: floresStored});
        });
    },

    

    obtener: function(req, res){
        
        //console.log(date)
        floresCorte.find({})
              .exec((err, flores)=> {
                    if(err) return res.status(500).send({message: 'error al devolver los datos'});
                    if(!flores) return res.status(404).send({message:'No hay insumos'});
                    
                    return res.status(200).send({flores});
                });
    },

    consulta: function(req, res){
        console.log("GRAN MARICA")
        console.log(req.query.empresa)
        console.log(req.query.sede)
        floresCorte.find({'empresa': req.query.empresa, 'sede': req.query.sede})
                   .where('fechaInicial').gt(req.query.dateBefore).lt(req.query.dateAfter)
                  .exec((err, floresCorte)=> {console.log(req.query.dateBefore); console.log(req.query.dateAfter)
                    
                        if(err) return res.status(500).send({message: 'error al devolver los datos'});
                        if(!floresCorte) return res.status(404).send({message:'No hay floresCorte'});
                        console.log("------------------------------------------------------------------")
                        console.log(floresCorte)
                        return res.status(200).send({floresCorte});

                   });
    }


};

module.exports = controller;
