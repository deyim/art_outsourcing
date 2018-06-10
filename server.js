const path = require('path');
const fs = require('fs');
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
var ss = require('socket.io-stream');
const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);


const publicPath = path.join(__dirname,'/public');
app.use(express.static(publicPath));

server.listen(port, ()=>{
    console.log("Starting the server...");
})

io.on('connection', (socket)=>{
    console.log('new user came');

    socket.on('doorSync', function(msg){
        console.log(msg);
        socket.broadcast.emit('ifSync',msg);
    })
   
    socket.on('disconnect', ()=>{
        console.log('browser shutdown')}
    );
})


// const path = require('path');
// const express = require('express');
// const http = require('http');
// const socketIO = require('socket.io');
// const port = process.env.PORT || 3000;


// // var server = http.createServer(app);
// var server = express.createServer();
// var io = socketIO(server);
// const publicPath = path.join(__dirname,'11/public');
// app.use(express.static(publicPath));

// server.get('/', (req,res)=>{
//     // res.sendFile(path.join(__dirname+'/public/index.html'));
//     res.render('index', {layout: false});
// })


// server.listen(port, ()=>{
//     console.log("Starting the server...");
// })