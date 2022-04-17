import { io } from "socket.io-client";

export default io(
	process.env.__DEV__
		? "ws://localhost:3000"
		: "ws://tertle-server.herokuapp.com/"
);
