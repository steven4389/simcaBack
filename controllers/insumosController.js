'use strict'

var insumo = require('../models/insumos');

var controller={
    home:function(req, res) {
        return res.status(200).send({
            message: "home"
        });
    },

    test:function(req, res){
        return res.status(200).send({
            message:"test"
        });
    },

    saveInsumo: function(req, res){
        var Insumo = new insumo();

        var params = req.body;
        Insumo.nombre= params.nombre;
        Insumo.proveedor= params.proveedor;
        console.log(params.proveedor)
        Insumo.cantidad= params.cantidad;
        Insumo.unidadMedida= params.unidadMedida;
        Insumo.costo= params.costo
        Insumo.empresa= params.empresa
        Insumo.sede= params.sede
        Insumo.clasificacion= params.clasificacion

        Insumo.save((err, InsumoStored)=>{
            if(err)return res.status(500).send({message: 'error en la peticion'});
            if(!InsumoStored) return res.status(404).send({message: 'no se ha podido guardar'});

            return res.status(200).send({Insumo: InsumoStored});
        });
    },

    getInsumo: function(req, res){
        console.log("si entro")
        var insumoId = req.params.id;
        if(insumoId == null) return res.status(404).send({message:'el proyecto no existe'});
        insumo.findById(insumoId, (err, insumo)=>{
                
                if(err) return res.status(500).send({message: 'Error al devolver datos'});
                if(!insumo) return res.status(404).send({message: 'el proyecto no existe'});

                return res.status(200).send({
                    insumo
                });
            
        });
    },

    getInsumos: function(req, res){
        console.log(req.query.empresa)
        console.log(req.query.sede)
        insumo.find({'empresa': req.query.empresa, 'sede': req.query.sede})
              .exec((err, insumo)=> {
                    if(err) return res.status(500).send({message: 'error al devolver los datos'});
                    if(!insumo) return res.status(404).send({message:'No hay insumos'});
                    console.log(insumo)
                    return res.status(200).send({insumo});
                });
    },

    updateInsumo: function(req, res){
        var insumoId = req.params.id;
        var update = req.body;
         console.log(update)
        insumo.findByIdAndUpdate(insumoId, update, {new:true}, (err, insumoUpdated)=>{
            if(err) return res.status(500).send({message:'error al actualizar'});
            if(!insumoUpdated) return res.status(404).send({message:'no se ha podido actualizar'});

            return res.status(200).send({
                insumo: insumoUpdated
            });
        });
    },

    deleteInsumo: function(req, res){
        var insumoId = req.params.id;

        insumo.findByIdAndDelete(insumoId, (err, InsumoRemoved)=>{
            if(err) return res.status(500).send({message: 'No se ha podido borrar'});
            if(!InsumoRemoved) return res.status(404).send({message:'No se puede eliminar'});

            return res.status(200).send({
                insumo: InsumoRemoved
            })
        });
    }

};

module.exports = controller;