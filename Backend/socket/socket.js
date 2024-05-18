import { Server } from "socket.io";
import http from 'http';
import express from 'express'

const app = express();

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: ["http://localhost:3000"],
        methods: ["GET", "POST"],
    },
})

const userSocket = {};

export const getReceiverSocketId = (receiverId) =>{
        return userSocket[receiverId];
}

io.on("connection", (socket)=>{
    console.log("a user connected ", socket.id);

    const userId = socket.handshake.query.userId;

    if(userId != "undefined") userSocket[userId] = socket.id;

    // send the message to all users about new user
    
    console.log("online users : ", userSocket)
    io.emit("getOnlineUsers", Object.keys(userSocket))
    

    socket.on("disconnect", ()=>{
        console.log("user disconnected", socket.id);

        delete userSocket[userId];
        io.emit("getOnlineUsers", Object.keys(userSocket))

    });
})


export { app, io, server };