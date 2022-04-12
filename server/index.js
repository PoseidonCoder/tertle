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
				socket.join(payload);
				io.sockets
					.in(payload)
					.emit("action", { type: "PLAYER_JOINED", payload: socket.id });
				if (!rooms[payload]) rooms[socket.id] = {};
				break;
		}
	});
});

const port = process.env.PORT || 3000;

server.listen(port, () => {
	console.log("listening on port " + port);
});
