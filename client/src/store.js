import { createStore, applyMiddleware, compose } from "redux";
import reducers from "./reducers";
import createSocketIOMiddleware from "./middleware/socketio";

const composedEnhancers = compose(
	applyMiddleware(createSocketIOMiddleware("ws://localhost:3000")),
	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

const store = createStore(reducers, undefined, composedEnhancers);

export default store;
