console.log('front-end js')

const socket = new WebSocket(`ws://${window.location.host}`);

socket.addEventListener("open", (event) => {
    console.log("Connected to Server ✅");
    console.log("open event ", event);
})

socket.addEventListener('message', (event) => {
    console.log("Socket Server : ", event);
    if(event){
        setTimeout(() => {
            socket.send({
                message: "this message is receive to browser"
            })
        }, 2000);
    }
})

socket.addEventListener("close", (event) => {
    console.log("Disconnected from Server ", event);
})

