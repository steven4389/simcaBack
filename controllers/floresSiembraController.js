'use strict'
var conversion = require('../Repository/conversion')
var moment = require('moment-timezone');
moment().format('MMMM Do YYYY, h:mm:ss a');

var floresSiembra = require('../models/floresSiembra');

var controller={

    create: function(req, res){console.log("entro")
        // console.log(req)
        // let date = moment().tz("America/Bogota").format('YYYY.MM.DD HH:mm');
        // date=conversion._getCadenaFecha(date);
        // console.log(date)

        var FloresSiembra = new floresSiembra();

        var params = req.body;
        FloresSiembra.fecha=params.fecha;
        FloresSiembra.variedad= params.variedad;
        FloresSiembra.cama= params.cama;
        FloresSiembra.lote= params.lote;
        FloresSiembra.codigoTrabajador= params.codigoTrabajador;
        FloresSiembra.empresa= params.empresa;
        FloresSiembra.sede= params.sede;
        FloresSiembra.dencidadLote=params.dencidadLote;
        FloresSiembra.cubetaCama=params.cubetaCama
        

        FloresSiembra.save((err, FloresSiembraStored)=>{
            if(err)return res.status(500).send({message: 'error en la peticion'});
            if(!FloresSiembraStored) return res.status(404).send({message: 'no se ha podido guardar'});

            return res.status(200).send({FloresTrazabilidad: FloresSiembraStored});
        });
    },

    

    obtener: function(req, res){
        
        //console.log(date)
        floresSiembra.find({})
              .exec((err, floresSiem)=> {
                    if(err) return res.status(500).send({message: 'error al devolver los datos'});
                    if(!floresSiem) return res.status(404).send({message:'No hay insumos'});
                    
                    return res.status(200).send({floresSiem});
                });
    },

    consulta: function(req, res){
        console.log("estamos en la consulta")
        console.log(req.query.empresa)
        console.log(req.query.sede)
        floresSiembra.find({'empresa': req.query.empresa, 'sede': req.query.sede})
                     .where('fecha').gt(req.query.dateBefore).lt(req.query.dateAfter)
                  .exec((err, floresSiem)=> {console.log(floresSiem)
                        if(err) return res.status(500).send({message: 'error al devolver los datos'});
                        if(!floresSiem) return res.status(404).send({message:'No hay floresCorte'});
                        return res.status(200).send({floresSiem});
                   });
    }


};

module.exports = controller;
