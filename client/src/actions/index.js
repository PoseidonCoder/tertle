import * as actions from "../constants";

export const submit = () => ({ type: actions.SUBMITTED });

export const type = (text) => ({ type: actions.TYPED, payload: text });

export const next = () => ({ type: actions.NEXT });

export const back = () => ({ type: actions.BACK });

export const join_game = (id = null) => ({
	type: actions.JOIN_GAME,
	payload: id,
});
