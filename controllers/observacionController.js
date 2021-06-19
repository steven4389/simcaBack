'use strict'
var conversion = require('../Repository/conversion')
var moment = require('moment-timezone');
const server= require('../index')

moment().format('MMMM Do YYYY, h:mm:ss a');

var observacion = require('../models/observaciones');

var controller={

    create: function(req, res){
        // console.log(req)
        // let date = moment().tz("America/Bogota").format('YYYY.MM.DD HH:mm');
        // date=conversion._getCadenaFecha(date);
        // console.log(date)

        var Observacion = new observacion();

        var params = req.body;
        Observacion.fecha=params.fecha;
        Observacion.lote= params.lote;
        Observacion.empresa= params.empresa;
        Observacion.sede= params.sede;
        Observacion.observacion= params.observacion;
        
        // console.log(Observacion)

        // const SocketIO =require('socket.io');
        //     const io = SocketIO(3100);

        // var messages=[{
        //     id:1,
        //     text:"bienvenido",
        //     nickname:"parva"
        // }];

        // io.on('connection', (socket)=>{
        //     console.log('new connection')
        //     socket.emit('messages', messages);
        // })


        Observacion.save((err, observacionstored)=>{
            if(err)return res.status(500).send({message: 'error en la peticion'});
            if(!observacionstored) return res.status(404).send({message: 'no se ha podido guardar'});

            // {observacion: observacionstored}
            return res.status(200).send({observacion: observacionstored});
        });
    },

    

    obtener: function(req, res){
        
        //console.log(date)
        observacion.find({})
              .exec((err, observaciones)=> {
                    if(err) return res.status(500).send({message: 'error al devolver los datos'});
                    if(!observaciones) return res.status(404).send({message:'No hay insumos'});
                    
                    return res.status(200).send({observaciones});
                });
    },

    consulta: function(req, res){
        console.log("estamos en la consulta")
        console.log(req.query.empresa)
        console.log(req.query.sede)
        observacion.find({'empresa': req.query.empresa, 'sede': req.query.sede})
                   .where('fecha').gt(req.query.dateBefore).lt(req.query.dateAfter)
                   .exec((err, observacion)=> {console.log(observacion)
                        if(err) return res.status(500).send({message: 'error al devolver los datos'});
                        if(!observacion) return res.status(404).send({message:'No hay observacion'});
                        return res.status(200).send({observacion});
                   });
    }


};

module.exports = controller;
