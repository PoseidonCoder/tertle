import { io } from "socket.io-client";

export default io(
	process.env.__DEV__
		? "ws://localhost:3000"
		: "wss://tertle-server.herokuapp.com/"
);
