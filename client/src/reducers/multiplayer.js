import { combineReducers } from "redux";
import * as actions from "../constants";
import board from "./domain/board";
import * as util from "../util";
import socket from "../socket";
import { set_board } from "../actions";

const INITIAL_STATE = {
	players: {},
	time: null,
	started: false,
	finished: false,
	nickname: null,
};

const multiplayer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case actions.PLAYERS:
			return {
				...state,
				players: action.payload,
			};

		case actions.GAME_STARTED:
			return {
				...state,
				time: action.payload,
				started: true,
			};

		case actions.SHOW_ANSWER:
			alert("The answer was: " + action.payload);
			return {
				...state,
				finished: true,
			};

		case actions.APPROVED_NICK:
			return {
				...state,
				nickname: action.payload,
			};

		default:
			return state;
	}
};

const submitToServer = (state, action) => {
	socket.emit(
		"action",
		{
			type: "server/" + actions.SUBMITTED,
			payload: state,
		},
		(board) => action.asyncDispatch(set_board(board, "multiplayer"))
	);
};

export default combineReducers({
	multiplayer,
	board: util.createNamedWrapperReducer(board(submitToServer), "multiplayer"),
});
