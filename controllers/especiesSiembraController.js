'use strict'
var conversion = require('../Repository/conversion')
var moment = require('moment-timezone');
moment().format('MMMM Do YYYY, h:mm:ss a');

var especiesSiembra = require('../models/especiesSiembra');

var controller={

    create: function(req, res){
        // console.log(req)
        // let date = moment().tz("America/Bogota").format('YYYY.MM.DD HH:mm');
        // date=conversion._getCadenaFecha(date);
        //  console.log(req.body)

        var EspeciesSiembra = new especiesSiembra();

        var params = req.body;
        EspeciesSiembra.fecha=params.fecha;
        EspeciesSiembra.codigoTrabajador= params.codigoTrabajador;
        EspeciesSiembra.lote= params.lote;
        EspeciesSiembra.densidadLote= params.densidadLote;
        EspeciesSiembra.cubetaCama= params.cubetaCama;
        EspeciesSiembra.cama= params.cama;
        EspeciesSiembra.variedad= params.variedad;
        EspeciesSiembra.empresa= params.empresa;
        EspeciesSiembra.sede= params.sede;
        
        console.log("el segundo log",EspeciesSiembra)

        EspeciesSiembra.save((err, especiesSiembraStored)=>{
            if(err)return res.status(500).send({message: 'error en la peticion'});
            if(!especiesSiembraStored) return res.status(404).send({message: 'no se ha podido guardar'});

            return res.status(200).send({EspeciesSiembra: especiesSiembraStored});
        });
    },

    

    obtener: function(req, res){
        
        //console.log(date)
        especiesSiembra.find({})
              .exec((err, especiesSiem)=> {
                    if(err) return res.status(500).send({message: 'error al devolver los datos'});
                    if(!especiesSiem) return res.status(404).send({message:'No hay insumos'});
                    
                    return res.status(200).send({especiesSiem});
                });
    },

    consulta: function(req, res){
        console.log("estamos en la consulta")
        console.log(req.query.empresa)
        console.log(req.query.sede)
        especiesSiembra.find({'empresa': req.query.empresa, 'sede': req.query.sede})
                       .where('fecha').gt(req.query.dateBefore).lt(req.query.dateAfter)
                  .exec((err, especiesSiem)=> {console.log(especiesSiem)
                        if(err) return res.status(500).send({message: 'error al devolver los datos'});
                        if(!especiesSiem) return res.status(404).send({message:'No hay floresCorte'});
                        return res.status(200).send({especiesSiem});
                   });
    }


};

module.exports = controller;
