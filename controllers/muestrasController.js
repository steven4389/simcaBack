'use strict'
var conversion = require('../Repository/conversion')
var moment = require('moment-timezone');
moment().format('MMMM Do YYYY, h:mm:ss a');

var muestras = require('../models/muestras');

var controller={

    create: function(req, res){

        var Muestras = new muestras();

        var params = req.body;
        Muestras.fecha=params.fecha;
        Muestras.muestras= params.muestras;
        Muestras.empresa= params.empresa;
        Muestras.sede= params.sede;
        Muestras.lote= params.lote;
        
        console.log(params)

        Muestras.save((err, MuestrasStored)=>{
            if(err)return res.status(500).send({message: 'error en la peticion'});
            if(!MuestrasStored) return res.status(404).send({message: 'no se ha podido guardar'});

            return res.status(200).send({muestras: MuestrasStored});
        });
    },

    

    obtener: function(req, res){
        
        //console.log(date)
        Muestras.find({})
              .exec((err, muestras)=> {
                    if(err) return res.status(500).send({message: 'error al devolver los datos'});
                    if(!muestras) return res.status(404).send({message:'No hay insumos'});
                    
                    return res.status(200).send({muestras});
                });
    },

    consulta: function(req, res){
        console.log("estamos en la consulta")
        console.log(req.query.empresa)
        console.log(req.query.sede)
        let fecha= req.query.fecha.substr(0,8)
        console.log("las muestras", req.query)
        console.log("fecha", fecha)
        muestras.find({'empresa': req.query.empresa, 'sede': req.query.sede, 'lote': req.query.lote, 'fecha': {'$regex': fecha}})
                   //.where('fecha').gt(req.query.dateBefore).lt(req.query.dateAfter)
                   .exec((err, muestras)=> {console.log(muestras)
                        if(err) return res.status(500).send({message: 'error al devolver los datos'});
                        if(!muestras) return res.status(404).send({message:'No hay observacion'});
                        return res.status(200).send({muestras});
                   });
    }


};

module.exports = controller