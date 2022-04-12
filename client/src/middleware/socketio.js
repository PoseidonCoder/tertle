import { io } from "socket.io-client";
import * as actions from "../constants";

export default function createSocketIOMiddleware(
	url,
	{ eventName = "action" } = {}
) {
	const socket = io(url);

	return ({ dispatch }) => {
		// Socket.io messages are dispatched as actions
		socket.on(eventName, dispatch);

		return (next) => (action) => {
			if (!action || !action.type) return false;

			if (action.type.indexOf("server/") === 0) {
				if (action.type === actions.JOIN_GAME && !action.payload)
					action.payload = socket.id;
				console.log(action);
				socket.emit(eventName, action);
			}

			return next(action);
		};
	};
}
