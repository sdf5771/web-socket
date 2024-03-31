console.log('front-end js')

const messageList = document.querySelector("ul");
const messageForm = document.querySelector("form");
const socket = new WebSocket(`ws://${window.location.host}`);

socket.addEventListener("open", (event) => {
    console.log("Connected to Server ✅");
    console.log("open event ", event);
})

socket.addEventListener('message', (event) => {
    console.log("Socket Server : ", event.data);
})

socket.addEventListener("close", (event) => {
    console.log("Disconnected from Server ", event);
})

function handleSubmit(event){
    event.preventDefault();
    const input = messageForm.querySelector("input");
    socket.send(input.value);
    input.value = "";
}

messageForm.addEventListener("submit", handleSubmit);