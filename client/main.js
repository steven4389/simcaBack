var socket = io.connect('http://localhost:3100', {'forceNew': true});

socket.on('messages', function(data){
    console.log(data)
});