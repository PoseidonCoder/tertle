import { createServer } from "http";
import { Server } from "socket.io";
import fs from "fs";

let words;

try {
	words = fs.readFileSync("words.txt").toString().split("\n");
} catch (err) {
	console.error(err);
}

const server = createServer();
const io = new Server(server, {
	cors: { origin: "*" },
});

let rooms = {};

const charColor = (answer, char, i) =>
	answer.includes(char.toLowerCase())
		? answer.indexOf(char.toLowerCase()) === i
			? "#6aaa64"
			: "#c9b458"
		: "#86888a";

io.on("connection", (socket) => {
	const cleanBoards = () => {
		let cleanedBoards = {};
		for (const id in rooms[socket.data.room].players) {
			const player = rooms[socket.data.room].players[id];
			cleanedBoards[id] = {
				...player,
				board: player.board.map((row) =>
					row.map((cell) => ({ ...cell, text: "" }))
				),
			};
		}
		return cleanedBoards;
	};

	socket.on("action", ({ type, payload }, callback) => {
		switch (type.split("server/")[1]) {
			case "JOIN_GAME":
				if (!rooms[payload]) rooms[payload] = { players: {} };
				rooms[payload].players[socket.id] = {
					board: [...Array(6)].map(() => Array(5).fill({ text: "" })),
				};
				socket.join(payload);
				rooms[payload].answer = words[Math.floor(Math.random() * words.length)];
				socket.data.room = payload;

				io.sockets
					.in(payload)
					.emit("action", { type: "PLAYERS", payload: rooms[payload].players });

				if (rooms[payload].started)
					socket.emit("action", {
						type: "GAME_STARTED",
						payload: rooms[payload].time,
					});

				break;

			case "LEAVE_GAME":
				delete rooms[socket.data.room].players[socket.id];
				socket.leave(socket.data.room);
				io.sockets.in(socket.data.room).emit("action", {
					type: "PLAYERS",
					payload: cleanBoards(),
				});
				break;

			case "START_GAME":
				if (rooms[socket.id]) {
					rooms[socket.id].time = new Date().getTime();
					rooms[socket.id].started = true;

					io.in(socket.id).emit("action", {
						type: "GAME_STARTED",
						payload: rooms[socket.id].time,
					});
				}

				break;

			case "SEND_NICK":
				if (rooms[socket.data.room]) {
					rooms[socket.data.room].players[socket.id].nickname = payload;

					socket.emit("action", {
						type: "APPROVED_NICK",
						payload,
					});

					const boards = cleanBoards();

					io.sockets.in(socket.data.room).emit("action", {
						type: "PLAYERS",
						payload: boards,
					});
				}

				break;

			case "SUBMITTED":
				if (!payload.won && payload.board[5][4].text !== "") {
					rooms[socket.data.room].players[socket.id].won = false;
					if (
						Object.keys(rooms[socket.data.room].players).every(
							(id) => rooms[socket.data.room].players[id].won !== undefined
						)
					) {
						io.in(socket.data.room).emit("action", {
							type: "SHOW_ANSWER",
							payload: rooms[socket.data.room].answer,
						});
					}
				}

				const newBoard = payload.board.map((row, i) => {
					if (i != payload.currentRow) return row;

					let correct = 0;

					const coloredRow = row.map((char, i) => {
						const color = charColor(
							rooms[socket.data.room].answer,
							char.text,
							i
						);
						char.color = color;
						payload.guessStatus[char.text] = color;

						if (color === "#6aaa64") correct++;

						return char;
					});

					if (correct === 5)
						rooms[socket.data.room].players[socket.id].won = true;

					return coloredRow;
				});

				rooms[socket.data.room].players[socket.id].board = newBoard;

				io.in(socket.data.room).emit("action", {
					type: "PLAYERS",
					payload: cleanBoards(),
				});

				callback({ board: newBoard, guessStatus: payload.guessStatus });

				break;
		}
	});
});

const port = process.env.PORT || 3000;

server.listen(port, () => {
	console.log("listening on port " + port);
});
