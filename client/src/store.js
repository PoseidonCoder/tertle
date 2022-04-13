import { createStore, applyMiddleware, compose } from "redux";
import reducers from "./reducers";
import createSocketIOMiddleware from "./middleware/socketio";
import socket from "./socket";

const composedEnhancers = compose(
	applyMiddleware(createSocketIOMiddleware(socket)),
	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

const store = createStore(reducers, undefined, composedEnhancers);

export default store;
