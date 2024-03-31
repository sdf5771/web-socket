console.log('front-end js')

const messageList = document.querySelector("ul");
const nicknameForm = document.querySelector("#nickname");
const messageForm = document.querySelector("#message");
const socket = new WebSocket(`ws://${window.location.host}`);

function makeSendMessage(type, payload){
    const msg = {type, payload};

    return JSON.stringify(msg);
}

socket.addEventListener("open", (event) => {
    console.log("Connected to Server ✅");
    console.log("open event ", event);
})

socket.addEventListener('message', (message) => {
    console.log("Socket Server : ", message.data);
    const li = document.createElement("li");

    li.innerText = message.data;
    messageList.append(li);
})

socket.addEventListener("close", (event) => {
    console.log("Disconnected from Server ", event);
})

function handleSubmit(event){
    event.preventDefault();
    const input = messageForm.querySelector("input");
    socket.send(makeSendMessage("new_message", input.value));
    input.value = "";
}

messageForm.addEventListener("submit", handleSubmit);

function handleNicknameSubmit(event){
    event.preventDefault();
    const input = nicknameForm.querySelector("input");
    socket.send(makeSendMessage("nickname", input.value));
}

nicknameForm.addEventListener("submit", handleNicknameSubmit);