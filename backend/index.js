import { Server } from "socket.io";

const io = new Server(3001, {
  cors: {
    origin: ["http://127.0.0.1:3000", "http://localhost:3000"],
  },
});

io.on("connect", (socket) => {
  console.log(`connect with client ${socket.handshake.address}`);
});
