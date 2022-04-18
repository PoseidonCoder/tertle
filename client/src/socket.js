import { io } from "socket.io-client";

export default io(
	__DEV__ ? "ws://localhost:3000" : "wss://tertle-server.herokuapp.com/"
);
