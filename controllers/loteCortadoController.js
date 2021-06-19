'use strict'
var conversion = require('../Repository/conversion')
var moment = require('moment-timezone');
moment().format('MMMM Do YYYY, h:mm:ss a');

var loteCortado = require('../models/loteCortado');

var controller={

    create: function(req, res){
        //console.log(req)
        // let date = moment().tz("America/Bogota").format('YYYY.MM.DD HH:mm');
        // date=conversion._getCadenaFecha(date);
        // console.log(date)

        var LoteCortado = new loteCortado();

        var params = req.body;
        LoteCortado.fecha=params.fecha;
        LoteCortado.loteCortado= params.loteCortado;
        LoteCortado.empresa= params.empresa;
        LoteCortado.sede= params.sede;
        
        console.log(LoteCortado)

        LoteCortado.save((err, LoteCortadostored)=>{
            if(err)return res.status(500).send({message: 'error en la peticion'});
            if(!LoteCortadostored) return res.status(404).send({message: 'no se ha podido guardar'});

            return res.status(200).send({LoteCortado: LoteCortadostored});
        });
    },

    

    obtener: function(req, res){
        
        //console.log(date)
        loteCortado.find({})
              .exec((err, LoteCortado)=> {
                    if(err) return res.status(500).send({message: 'error al devolver los datos'});
                    if(!LoteCortado) return res.status(404).send({message:'No hay insumos'});
                    
                    return res.status(200).send({LoteCortado});
                });
    },

    consulta: function(req, res){
        console.log("estamos en la consulta")
        console.log(req.query.empresa)
        console.log(req.query.sede)
        loteCortado.find({'empresa': req.query.empresa, 'sede': req.query.sede})
                   .where('fecha').gt(req.query.dateBefore).lt(req.query.dateAfter)
                   .exec((err, loteCortado)=> {console.log(loteCortado)
                        if(err) return res.status(500).send({message: 'error al devolver los datos'});
                        if(!loteCortado) return res.status(404).send({message:'No hay observacion'});
                        return res.status(200).send({loteCortado});
                   });
    }


};

module.exports = controller;
