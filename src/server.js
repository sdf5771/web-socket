import http from 'http';
import WebSocket from 'ws';
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
const server = http.createServer(app);

// Create Web Socket Server with http Server
const webSocketServer = new WebSocket.Server({ server });

webSocketServer.on("connection", (socket) => {
    console.log("Socket Server : Connected to Browser ✅")
    socket.on("close", () => console.log("Disconnected from the Browser"));
    socket.send('socket: send message');
    socket.on("message", (message) => {
        console.log("Browser Sending Message :", message);
    })
})

server.listen(3000, handleAppListen);