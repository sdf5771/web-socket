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

const server = http.createServer(app);
const webSocketServer = new WebSocket.Server({ server });

server.listen(3000, handleAppListen);