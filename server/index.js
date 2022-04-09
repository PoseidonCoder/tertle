import { createServer } from "http";
import { Server } from "socket.io";

const server = createServer();
const io = new Server(server, {
	cors: { origin: "*" },
});

let rooms = {};

io.on("connection", (socket) => {
	socket.on("create room", () => {
		rooms[socket.id] = {};
	});

	socket.on("join room", ({ id }) => {
		socket.join(id);
	});
});

const port = process.env.PORT || 3000;

server.listen(port, () => {
	console.log("listening on port " + port);
});
