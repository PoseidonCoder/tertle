import * as actions from "../constants";

const INITIAL_STATE = {
	players: [],
	time: null,
	started: false,
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

		default:
			return state;
	}
};

export default multiplayer;
