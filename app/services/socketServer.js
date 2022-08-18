//~import modules
import express from 'express';
const app = express();
//! important import http
import { Server } from 'socket.io';
import { createServer } from 'http';


const server = createServer(app);

//^use server here
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    }
});

io.on('connection', (socket) => {
    console.log(`\x1b[1;32mUser connected :\x1b[0m`, socket.id);
    //expected output => User connected : GieGRdtJjrWmBQuLAAAB

    socket.on('join_room', (data) => {
        socket.join(data);
        console.log(`\x1b[1;35mUser with ID : ${socket.id} joined room : ${data}\x1b[0m`)
    })

    socket.on('send_message', (data) => {
        socket.to(data.room).emit('receive_message',data)
    })

    socket.on('disconnect', () => {
        console.log(`\x1b[1;31mUser disconnected :\x1b[0m`, socket.id);
    })
});

export { server };
 