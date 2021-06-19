'use strict'

var trabajadores = require('../models/trabajadores');

var controller={
    
    Nuevo: function(req, res, next){
            console.log(req.body.empresa)
        trabajadores.find({})

        var Trabajadores = new trabajadores({
            cedula:req.body.cedula,
            dependencia:req.body.dependencia,
            nombre:req.body.nombre,
            codigo:req.body.codigo,
            empresa:req.body.empresa,
            sede:req.body.sede
        })
        console.log(Trabajadores)
        let promise = Trabajadores.save();
        
        promise.then(function(doc){
            return res.status(201).json(doc);
        })

        promise.catch(function(err){
            return res.status(501).json({message: 'Error al registrar el empleado.'})
        })

    },

    getTrabajador: function(req, res){
        console.log("si entro")
        var trabajadorId = req.params.id;
        if(trabajadorId == null) return res.status(404).send({message:'el proyecto no existe'});
        trabajadores.findById(trabajadorId, (err, trabajador)=>{
                
                if(err) return res.status(500).send({message: 'Error al devolver datos'});
                if(!trabajador) return res.status(404).send({message: 'el proyecto no existe'});

                return res.status(200).send({
                    trabajador
                });
            
        });
    },

    getTrabajadores: function(req, res){
        console.log("aca estamos")
        console.log(req.query.empresa)
        console.log(req.query.sede)
        trabajadores.find({'empresa': req.query.empresa, 'sede': req.query.sede})
              .exec((err, trabajador)=> {
                    if(err) return res.status(500).send({message: 'error al devolver los datos'});
                    if(!trabajador) return res.status(404).send({message:'No hay insumos'});
                    console.log(trabajador)
                    return res.status(200).send({trabajador});
                });
    },

    updateTrabajador: function(req, res){
        console.log("entro")
        var trabajadorId = req.params.id;
        var update = req.body;
        console.log(update)
        trabajadores.findByIdAndUpdate(trabajadorId, update, {new:true}, (err, trabajadorUpdated)=>{
            if(err) return res.status(500).send({message:'error al actualizar'});
            if(!trabajadorUpdated) return res.status(404).send({message:'no se ha podido actualizar'});

            return res.status(200).send({
                trabajador: trabajadorUpdated
            });
        });
    },

    deleteTrabajador: function(req, res){
        var trabajadorId = req.params.id;

        trabajadores.findByIdAndDelete(trabajadorId, (err, trabajadorRemoved)=>{
            if(err) return res.status(500).send({message: 'No se ha podido borrar'});
            if(!trabajadorRemoved) return res.status(404).send({message:'No se puede eliminar'});

            return res.status(200).send({
                trabajador: trabajadorRemoved
            })
        });
    }

}
module.exports = controller;



