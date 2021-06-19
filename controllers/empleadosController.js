'use strict'

var conversion = require('../Repository/conversion')
var empleados = require('../models/empleados');
var trabajadores = require('../models/trabajadores');
var moment = require('moment-timezone');

var controller={


    Registro: async function(req, res, next) {
        var Id = req.body.ID;
        var HorasTrabajadas = conversion.stringDate(req.body.entrada1, req.body.salida1, req.body.entrada2, req.body.salida2);
     
        try {
            var restrabajadores = await trabajadores.find({'codigo': Id }).exec();
            console.log("la res trabajadores")   
            console.log(restrabajadores)
            if (restrabajadores) {
            
            if(req.body.entrada1=="000000000000"){
    
                    let date= new Date();
                    let fecha1 = conversion.getCadenaFecha(date)
                    fecha1=(fecha1).slice(0, 4) + "."+ (fecha1).slice(4);
                    fecha1=(fecha1).slice(0, 7) + "."+ (fecha1).slice(7);
                    fecha1=(fecha1).slice(0, 10) + " "+ (fecha1).slice(10);
                    fecha1=(fecha1).slice(0, 13) + ":"+ (fecha1).slice(13);
                    date= moment(fecha1,'YYYY.MM.DD HH:mm').tz('America/Bogota');
                    
                    date = conversion.getCadenaFecha(date);
                    
                    var Empleados = new empleados({
                            cedula: restrabajadores[0].cedula,
                            nombre: restrabajadores[0].nombre,
                            dependencia: restrabajadores[0].dependencia,
                            entrada1: date,
                            salida1: "0",
                            entrada2: "0",
                            salida2: "0",
                            horasTrabajadas: HorasTrabajadas[0] + "." + HorasTrabajadas[1],
                            empresa:req.body.empresa,
                            sede:req.body.sede
                            
                        })
                        
                    }else if(req.body.entrada2=="000000000000"){
    
                            console.log(Id)
    
                        var Empleados = new empleados({
                            cedula: restrabajadores[0].cedula,
                            nombre: restrabajadores[0].nombre,
                            dependencia: restrabajadores[0].dependencia,
                            entrada1: req.body.entrada1,
                            salida1: req.body.salida1,
                            entrada2: "0",
                            salida2: "0",
                            horasTrabajadas: HorasTrabajadas[0] + "." + HorasTrabajadas[1],
                            empresa:req.body.empresa,
                            sede:req.body.sede
                        })
                
                        }else{
    
                            var Empleados = new empleados({
                            cedula: restrabajadores[0].cedula,
                            nombre: restrabajadores[0].nombre,
                            dependencia: restrabajadores[0].dependencia,
                            entrada1: req.body.entrada1,
                            salida1: req.body.salida1,
                            entrada2: req.body.entrada2,
                            salida2: req.body.salida2,
                            horasTrabajadas: HorasTrabajadas[0] + "." + HorasTrabajadas[1],
                            empresa:req.body.empresa,
                            sede:req.body.sede
                        })
                        console.log(restrabajadores[0].nombre)
                
                    }//else{
                    //     return res.status(501).json({message: 'Error al registrar control de empleados.'})
                    // }
            
            try {
            let doc = await Empleados.save();
            
                if (doc) {
                return res.status(201).json(/*doc*/{message: 'todo correcto'});
                } 
            } catch (err) {
                return res.status(501).json({message: 'Error al registrar control de empleados.'})
            }
                    
            
                
            } else {
            return res.status(404).send({message:'No hay Historials'});
            }
        } catch (err) {console.log(err)
            return res.status(500).send({message: 'error al devolver los datos'});
        }
    },

    obtener: function(req, res){
        console.log(req.query)
         empleados.find({'empresa': req.query.empresa, 'sede': req.query.sede})
                  .where('entrada1').gt(req.query.dateBefore).lt(req.query.dateAfter)
                  .exec((err, empleados)=> {console.log(empleados)
                        if(err) return res.status(500).send({message: 'error al devolver los datos'});
                        if(!empleados) return res.status(404).send({message:'No hay Historials'});
                        return res.status(200).send({empleados});
                   });
    }

};

module.exports = controller;






