const socket = io();

const welcome = document.querySelector("#welcome");
const form = welcome.querySelector("form");

function backendCallback(msg){
    console.log("Server : ", msg);
}

function handleRoomSubmit(event){
    event.preventDefault();
    const input = form.querySelector("input");
    socket.emit("enter_room", input.value, backendCallback);
    input.value = ""
}

form.addEventListener('submit', handleRoomSubmit);