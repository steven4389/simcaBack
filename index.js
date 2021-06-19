'use strict'

var mongoose = require('mongoose');
var app= require('./app');
var port= 3700;
const path = require('path')

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

mongoose.Promise = global.Promise;
//mongoose.connect('mongodb://127.0.0.1:27017/simca', { useNewUrlParser: true, useUnifiedTopology: true })
mongoose.connect('mongodb://mongo/simca', { useNewUrlParser: true, useUnifiedTopology: true })
        .then(()=>{
            console.log("connection full");
            //servidor
            var server= app.listen(port, ()=>{
                console.log("servidor corriendo");
                // console.log(data)
                
            const SocketIO =require('socket.io');
            const io = SocketIO(server);

            var messages=[{
                id:1,
                text:"bienvenido",
                nickname:"parva"
            }];

            io.on('connection', (socket)=>{
                console.log('new connection')
                socket.emit('messages', messages);
            })


            });

            module.exports = server;

        }).catch(err=> console.log(err));



