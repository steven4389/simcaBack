'use strict'
var express= require('express');
var insumosController= require('../controllers/insumosController');
var historialController= require('../controllers/historialController');
var empleadosController= require('../controllers/empleadosController');
var trabajadoresController= require('../controllers/trabajadoresController');
var trazabilidadControllerEspecies= require('../controllers/trazabilidadControllerEspecies');
var trazabilidadControllerPYE= require('../controllers/trazabilidadControllerPYE');
var floresCorteController= require('../controllers/floresCorteController');
var floresTrazabilidadController= require('../controllers/floresTrazabilidadController');
var floresPYEController = require('../controllers/floresPYEController');
var especiesSiembraController= require('../controllers/especiesSiembraController');
var floresSiembraController= require('../controllers/floresSiembraController');
var observacionesController= require('../controllers/observacionController');
var loteCortadoController= require('../controllers/loteCortadoController');
var muestrasController= require('../controllers/muestrasController');
var severidadController = require('../controllers/severidadController')
var incidenciaController = require('../controllers/incidenciaController')
var floresSiembraPlantasMadreController = require('../controllers/floresSiembraPlantasMadreController')
var User = require('../models/user');
var jwt = require('jsonwebtoken');

var router= express.Router();

//inventario
router.get('/home', insumosController.home);
router.post('/test', insumosController.test);
router.post('/save-insumo', insumosController.saveInsumo);
router.get('/insumo/:id?', insumosController.getInsumo);
router.get('/insumos/:empresa?:sede?', insumosController.getInsumos); 
router.put('/insumo/:id', insumosController.updateInsumo);
router.delete('/insumo/:id', insumosController.deleteInsumo);

//historial de inventario
router.post('/save-registro', historialController.saveHistorial);
router.get('/historial/:empresa?:sede?', historialController.getHistorial); 
router.delete('/borrar-historial/:empresa?:sede?', historialController.deleteHistorial);
router.get('/consulta/:dateBefore?:dateAfter?:empresa?:sede?', historialController.consulta);

//Dispositivo para el ctrol de empleados
router.post('/control', empleadosController.Registro);
router.get('/obtener/:dateBefore?:dateAfter?:empresa?:sede?', empleadosController.obtener);
router.post('/trabajadorNuevo', trabajadoresController.Nuevo);
router.get('/trabajador/:id?', trabajadoresController.getTrabajador);
router.get('/trabajadores/:empresa?:sede?', trabajadoresController.getTrabajadores);  
router.put('/trabajador/:id', trabajadoresController.updateTrabajador);
router.delete('/trabajador/:id', trabajadoresController.deleteTrabajador);

//app---------
router.post('/observaciones', observacionesController.create);
router.get('/observaciones', observacionesController.consulta);

router.post('/muestras', muestrasController.create);
router.get('/muestras', muestrasController.consulta);

//-------------------especies--------------------
router.post('/especiesTrazabilidad', trazabilidadControllerEspecies.create);
router.get('/especiesTrazabilidad', trazabilidadControllerEspecies.consulta);

router.post('/especiesPYE', trazabilidadControllerPYE.create);
router.get('/especiesPYE', trazabilidadControllerPYE.consulta);

router.post('/especiesSiembra', especiesSiembraController.create);
router.get('/especiesSiembra', especiesSiembraController.obtener);

//------------------flores-------------------
router.post('/floresCorte', floresCorteController.create);
router.get('/floresCorte', floresCorteController.consulta);

router.post('/floresTrazabilidad', floresTrazabilidadController.create);
router.get('/floresTrazabilidad', floresTrazabilidadController.consulta);

router.post('/floresPYE', floresPYEController.create);
router.get('/floresPYE', floresPYEController.consulta);//tabla normal
router.get('/_floresPYE', floresPYEController._consulta);//incidencia
router.get('/__floresPYE', floresPYEController._consultaUnaFecha);//reporte ICA

router.post('/floresSiembra', floresSiembraController.create);
router.get('/floresSiembra', floresSiembraController.consulta);

router.post('/floresCorteSistemaLoteCortado', loteCortadoController.create);
router.get('/floresCorteSistemaLoteCortado', loteCortadoController.consulta);

router.post('/severidad', severidadController.create);
router.get('/severidad', severidadController.consulta);

router.post('/incidencia', incidenciaController.create);
router.get('/incidencia', incidenciaController.consulta);

router.post('/floresSiembraPlantasMadres', floresSiembraPlantasMadreController.create);
router.get('/floresSiembraPlantasMadres/:dateBefore?:dateAfter?:empresa?:sede?', floresSiembraPlantasMadreController.consulta);

//register--------------------------------------
router.post('/register', function(req,res,next){
    console.log("hola si si ")
  var user = new User({
    email: req.body.email,
    username: req.body.username,
    password: User.hashPassword(req.body.password),
    role: req.body.role,
    empresa: req.body.empresa,
    sedes: req.body.sedes,
    creation_dt: Date.now()
  });



  let promise = user.save();
  console.log(user)
  promise.then(function(doc){
    return res.status(201).json(doc);
  })

  promise.catch(function(err){
    return res.status(501).json({message: 'Error registering user.'})
  })
})

//login
router.post('/login', function(req,res,next){
   let promise = User.findOne({email:req.body.email}).exec();
 console.log(promise)
   promise.then(function(doc){
     console.log("2")
    if(doc) {
      if(doc.isValid(req.body.password)){
          // generate token
          let token = jwt.sign({role:doc.role, empresa:doc.empresa, sedes:doc.sedes},'secret', {expiresIn : 60*1});
            console.log(token)
          return res.status(200).json(token);

      } else {
        console.log(doc)
        return res.status(501).json({message:'La contraseña ingresada es incorrecta'});
      }
    }
    else {
      console.log("revisar")
      return res.status(501).json({message:'El usuario ingresado es invalido'})
    }
   });

   promise.catch(function(err){
     return res.status(501).json({message:'Some internal error'});
   })
})

router.get('/username', verifyToken, function(req,res,next){
  var objeto={role: decodedToken.role, empresa: decodedToken.empresa, sedes: decodedToken.sedes}
  return res.status(200).json(objeto);
})

var decodedToken='';
function verifyToken(req,res,next){
  let token = req.query.token;
  token = JSON.parse(token);

  jwt.verify(token,'secret', function(err, tokendata){
    console.log("el token",req.query.token)
    console.log(tokendata)
    if(err){
      console.log("por lo menos entro")
      console.log(err)
      return res.status(400).json({message:' Unauthorized request'});
    }
    if(tokendata){
      console.log("ya esta bueno")
      decodedToken = tokendata;
      console.log(decodedToken)
      next();
    }
  })
}

module.exports= router;