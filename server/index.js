import { createServer } from "http";
import { Server } from "socket.io";

const server = createServer();
const io = new Server(server, {
	cors: { origin: "*" },
});

let rooms = {};

io.on("connection", (socket) => {
	socket.on("action", ({ type, payload }) => {
		console.log(type, payload);
		switch (type.split("server/")[1]) {
			case "JOIN_GAME":
				if (!rooms[payload]) rooms[payload] = { players: [] };
				rooms[payload].players.push(socket.id);
				socket.join(payload);
				io.sockets
					.in(payload)
					.emit("action", { type: "PLAYERS", payload: rooms[payload].players });
				break;

			case "LEAVE_GAME":
				rooms[payload].players = rooms[payload].players.filter(
					(id) => id != socket.id
				);
				socket.leave(payload);
				io.sockets
					.in(payload)
					.emit("action", { type: "PLAYERS", payload: rooms[payload].players });
				break;
		}
	});
});

const port = process.env.PORT || 3000;

server.listen(port, () => {
	console.log("listening on port " + port);
});
