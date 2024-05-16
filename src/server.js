import http from 'http';
// import WebSocket from 'ws';
import SocketIO from 'socket.io';
import express from 'express';

const app = express();

app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use("/public", express.static(__dirname + "/public"));
app.get("/", (req, res) => res.render("home"));
app.get("/*", (req, res) => res.render("notfound"));

const handleAppListen = () => console.log('Server Start');

// app.listen(3000, handleAppListen);

// Create HTTP Server
const httpServer = http.createServer(app);
const socketIoServer = SocketIO(httpServer);

function publicRooms(){
    const {sockets: {adapater: {sids, rooms}}} = socketIoServer;
    const publicRooms = [];

    rooms.forEach((_, key) => {
        if(sids.get(key) === undefined){
            publicRooms.push(key);
        }
    })

    return publicRomms;
}

socketIoServer.on("connection", (socket) => {
    socket["nickname"] = "Anonymous";
    socket.onAny((event) => {
        console.log(socketIoServer.sockets.adapater);
        console.log(`Sockey Event : ${event}`);

    })
    socket.on("enter_room", (roomName, callback) => {
        socket.join(roomName)
        callback();
        socket.to(roomName).emit("welcome", socket.nickname);

        socketIoServer.sockets.emit("room_change", publicRooms());
    })

    socket.on("new_message", (message, room, callback) => {
        socket.to(room).emit("new_message", `${socket.nickname}: ${message}`);
        callback();
    })

    socket.on("nickname", nickname => socket["nickname"] = nickname);

    socket.on('disconnecting', () => {
        socket.rooms.forEach((room) => {
            socket.to(room).emit("bye", socket.nickname)
        })
    })

    socket.on('disconnect', () => {
        socketIoServer.sockets.emit("room_change", publicRooms());
    })
})

// Create Web Socket Server with http Server
// const webSocketServer = new WebSocket.Server({ server });
// const sockets = [];
// webSocketServer.on("connection", (socket) => {
//     sockets.push(socket);
//     socket["nickname"] = "Anonymous";
//     console.log("Socket Server : Connected to Browser ✅")
//     socket.on("close", () => console.log("Disconnected from the Browser"));
//     socket.on("message", (strMsgData) => {
//         const message = JSON.parse(strMsgData);
//         switch(message.type){
//             case "new_message":
//                 sockets.forEach((user) => user.send(`${socket.nickname}: ${message.payload}`));
//                 break
            
//             case "nickname":
//                 socket["nickname"] = message.payload;
//                 break
//         }
//     })
// })

httpServer.listen(3000, handleAppListen);