'use strict'
var conversion = require('../Repository/conversion')
var moment = require('moment-timezone');
moment().format('MMMM Do YYYY, h:mm:ss a');

var floresSiembraPlantasMadres = require('../models/floresSiembraPlantasMadres');

var controller={

    create: function(req, res){console.log("entro")
        // console.log(req)
        // let date = moment().tz("America/Bogota").format('YYYY.MM.DD HH:mm');
        // date=conversion._getCadenaFecha(date);
        // console.log(date)

        var FloresSiembraPlantasMadres = new floresSiembraPlantasMadres();

        var params = req.body;

        if(params.observaciones){
            FloresSiembraPlantasMadres.observaciones=params.observaciones
        }
        if(params.enrraizamientoPlantasMadre){
            FloresSiembraPlantasMadres.enrraizamientoPlantasMadres=params.enrraizamientoPlantasMadres
        }
        if(params.enrraizamientoProduccion){
            FloresSiembraPlantasMadres.enrraizamientoProduccion=params.enrraizamientoProduccion
        }
        if(params.cosecha){
            FloresSiembraPlantasMadres.cosecha=params.cosecha
        }
        if(params.cuartoFrio){
            FloresSiembraPlantasMadres.cuartoFrio=params.cuartoFrio
        }
        if(params.cuartoFrio && params.cosecha){
            FloresSiembraPlantasMadres.inventarioCosecha=parseInt(params.cuartoFrio) + parseInt(params.cosecha)
        }
        if(params.variedad){
            FloresSiembraPlantasMadres.variedad=params.variedad
        }
        if(params.fecha){
            FloresSiembraPlantasMadres.fecha=params.fecha
        }
        if(params.empresa){
            FloresSiembraPlantasMadres.empresa=params.empresa
        }
        if(params.sede){
            FloresSiembraPlantasMadres.sede=params.sede
        }
         

        console.log(FloresSiembraPlantasMadres)

        FloresSiembraPlantasMadres.save((err, FloresSiembraPlantasMadresStored)=>{
            if(err)return res.status(500).send({message: 'error en la peticion'});
            if(!FloresSiembraPlantasMadresStored) return res.status(404).send({message: 'no se ha podido guardar'});

            return res.status(200).send({FloresSiembraPlantasMadresStored: FloresSiembraPlantasMadresStored});
        });
    },

    

    obtener: function(req, res){
        
        //console.log(date)
        FloresSiembraPlantasMadres.find({})
              .exec((err, floresTr)=> {
                    if(err) return res.status(500).send({message: 'error al devolver los datos'});
                    if(!floresTr) return res.status(404).send({message:'No hay insumos'});
                    
                    return res.status(200).send({FloresSiembraPlantasMadres});
                });
    },

 consulta: function(req, res){
        console.log("estamos en la consulta")
        console.log(req.query.empresa)
        console.log(req.query.sede)

        floresSiembraPlantasMadres.find({'empresa': req.query.empresa, 'sede': req.query.sede})
                              .where('fecha').gt(req.query.dateBefore).lt(req.query.dateAfter)
                              .exec((err, FloresSiembraPlantasMadres)=> {
                                
                        console.log(FloresSiembraPlantasMadres)
                        if(err) return res.status(500).send({message: 'error al devolver los datos'});
                        if(!FloresSiembraPlantasMadres) return res.status(404).send({message:'No hay floresCorte'});
                        return res.status(200).send({FloresSiembraPlantasMadres});

                   });
    }


};

module.exports = controller;
