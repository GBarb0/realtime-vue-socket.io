import { Server } from "socket.io";

const io = new Server(3000, {
    cors: {
        origin: "http://localhost:8080",
        methods: ["GET", "POST"]
    }
});

io.on("connection", (socket) => {
    console.log(`New client connected: ${socket.id}`);

    socket.on("disconnect", () => {
        console.log(`Client disconnected: ${socket.id}`);
    });

    // Puoi inviare l'evento "ledStatus" quando vuoi, per esempio:
    setInterval(() => {
        const newStatus = Math.random() > 0.5; // Cambia in modo casuale lo stato del LED
        socket.emit("ledStatus", newStatus);
        console.log(`Sent new status: ${newStatus}`)
    }, 1000); // Ogni secondo
});

console.log("Server is listening on port 3000");
