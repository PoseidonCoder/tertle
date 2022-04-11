import { io } from "socket.io-client";

export default function createSocketIOMiddleware(
	url,
	{ eventName = "action" } = {}
) {
	const socket = io(url);

	return ({ dispatch }) => {
		// Socket.io messages are dispatched as actions
		socket.on(eventName, dispatch);

		return (next) => (action) => {
			if (action.type.indexOf("server/") === 0) {
				socket.emit(eventName, action);
				return next(action);
			}
		};
	};
}
