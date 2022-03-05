//import or require Express
//Static contents like HTML, CSS or JavaScript can be served using express.js
//it also create a server
const express = require('express');

const path = require('path');

const http = require('http'); //we need this in order to use socket.io 

const {joinedUser,currentUser ,removeUser} = require('./users');

const socketio = require('socket.io');


//creating server
/*1*/const app = express();

/*2*/const server = http.createServer(app);

/*3*/const io = socketio(server);

//now get the client side
//The argument you pass into express.static() is the name of the directory you want Express to serve files
//with the help of path module
app.use(express.static(path.join(__dirname,'frontEnd'))); 

//when a user connects:

//on(event, an event handler)
io.on('connection', socket => {

    socket.on('newUser', (userName) => {  
    const user = joinedUser(socket.id,userName);
    console.log(user.userName);
    //socket.emit(event, any data) : display only to the user that has just connects
    socket.emit('message', messageFormat('admin','Welcome to chatRoom!'));

    //socket.broadcast.emit: emit to every user in the server expect for the user that has just connects
    socket.broadcast.emit('message', messageFormat('admin',`${user.userName} has joined!`));

    });
    
    //listen for sendedMsg to emit it back to the client
    socket.on('sendedMsg',msg=>{
        const user = currentUser(socket.id);
       //io.emit: to display to all users
       io.emit('message',messageFormat(user.userName,msg));
   });
    
  //display when a user disconnects
    //()=>{...} is a function 
    socket.on('disconnect', ()=>{
        const user = removeUser(socket.id);
        if(user){
            io.emit('message', messageFormat('admin',`${user.userName} has left!`));
        }

    });


});

const Port = 8000 || process.env.Port //<= this search for varible Port to use it
//start listening to a port to run a server
server.listen(Port, () => {
    console.log('server is running on port', Port);
});

function messageFormat(userName, text){
    return{
        userName,
        text
    }
    
};