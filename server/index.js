import { createServer } from "http";
import { Server } from "socket.io";

const server = createServer();
const io = new Server(server, {
	cors: { origin: "*" },
});

let rooms = {};

io.on("connection", (socket) => {
	socket.on("action", ({ type, payload }) => {
		switch (type.split("server/")[1]) {
			case "JOIN_GAME":
				if (!rooms[payload]) rooms[payload] = { players: [] };
				rooms[payload].players.push(socket.id);
				socket.join(payload);

				if (rooms[payload].started)
					socket.emit({
						type: "GAME_STARTED",
						payload: rooms[payload].time,
					});

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

			case "START_GAME":
				if (rooms[socket.id]) {
					rooms[socket.id].time = new Date().getTime();
					rooms[socket.id].started = true;

					io.sockets.in(socket.id).emit("action", {
						type: "GAME_STARTED",
						payload: rooms[socket.id].time,
					});
				}
		}
	});
});

const port = process.env.PORT || 3000;

server.listen(port, () => {
	console.log("listening on port " + port);
});
