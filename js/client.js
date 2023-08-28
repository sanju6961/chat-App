const socket = io('http://localhost:8000');
const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp')
const messageContainer = document.querySelector(".container")

var audio = new Audio('ting.mp3');

const append = (message, position)=>{
const messageElement = document.createElement('div');
messageElement.innerText = message;
messageElement.classList.add('message');
messageElement.classList.add(position);
messageContainer.append(messageElement);
if(position =='Left'){ 
    audio.play();
}
}

const name = prompt("Enter your name to join");
socket.emit('new-user-joined', name);

socket.on('user-joined', name =>{
append(`${name} joined the chat`, 'Right')
})

// If server sends a message, receive it
socket.on('receive', data =>{
append(`${data.name}: ${data.message}`, 'Left');
})

// If a user leaves the chat, append the info to the container
socket.on('Left', name =>{
append(`${name} left the chat`, 'Right')
})

// If the form gets submitted, send server the message
form.addEventListener('submit', (e) => {
e.preventDefault();
const message = messageInput.value;
append(`You: ${message}`, 'Right');
socket.emit('send', message);
messageInput.value = ''
})