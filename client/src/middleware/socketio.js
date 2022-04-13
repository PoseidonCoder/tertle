import * as actions from "../constants";

const createSocketIOMiddleware =
	(socket, { eventName = "action" } = {}) =>
	({ dispatch }) => {
		// Socket.io messages are dispatched as actions
		socket.on(eventName, dispatch);

		return (next) => (action) => {
			if (!action || !action.type) return false;

			if (action.type.indexOf("server/") === 0) {
				if (action.type === actions.JOIN_GAME && !action.payload)
					action.payload = socket.id;
				socket.emit(eventName, action);
			}

			return next(action);
		};
	};

export default createSocketIOMiddleware;
