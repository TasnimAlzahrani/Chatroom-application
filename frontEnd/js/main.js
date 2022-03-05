//get the form that has the send button
const form = document.getElementById('chatAreaForm');

const newMsg = document.getElementById('messagesArea');

//get userName from URL

let params = new URLSearchParams(location.search);
const userName = params.get('username');

const socket = io();

//send username to the server
socket.emit('newUser',userName);

//on(event we get, message parameter to catch the emitted message and print)
//this message from the server baically
socket.on('message',message => {
    console.log(message);
    outputMessage(message);
});

//listen for when a user submit a message
form.addEventListener('submit',e => {
    e.preventDefault(); //this will prevent the submitted from from being submit into a file

    //get the text input
    //this will get the input by it id in the html file (which is "msg")
    const msg = e.target.elements.msg.value;

    //emit the message to the server
    socket.emit('sendedMsg',msg);

    
    //////making it more comfortable for the user///////

    //(1) automatically scroll down when a new message arrives
    newMsg.scrollTop = newMsg.scrollHeight;

    //(2) clear input area
    e.target.elements.msg.value = '';

    //(3) after sending the message let the focus be on the typing area so the user do not
    //have to re-click on the text box each time he/she wants to write a message
    e.target.elements.msg.focus();
 
});


function outputMessage(message){
    const div = document.createElement('div'); //create a div

    div.classList.add('message'); //adds new class with this div

    div.innerHTML = `<p class = "userAndTime">${message.userName}</p>
    <p class = "text" >${message.text}</p>`; //put this within this div

    //basically add it to the screen
    document.getElementById('messagesArea').appendChild(div);
};
