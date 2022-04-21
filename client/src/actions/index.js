import * as actions from "../constants";

export const submit = (mode) => () => ({ type: actions.SUBMITTED, name: mode });

export const type = (mode) => (text) => ({
	type: actions.TYPED,
	payload: text,
	name: mode,
});

export const next = () => ({ type: actions.NEXT, name: "singleplayer" });

export const back = () => ({ type: actions.BACK, name: "singleplayer" });

export const join_game = (id = null) => ({
	type: actions.JOIN_GAME,
	payload: id,
});

export const leave_game = (id) => ({ type: actions.LEAVE_GAME, payload: id });

export const start_game = () => ({ type: actions.START_GAME });

export const set_board = (board, mode) => ({
	type: actions.SETTED_BOARD,
	payload: board,
	name: mode,
});

export const send_nick = (nick) => ({ type: actions.SEND_NICK, payload: nick });
