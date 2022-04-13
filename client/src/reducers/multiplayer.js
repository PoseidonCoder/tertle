import * as actions from "../constants";

const INITIAL_STATE = {
	game_id: null,
	players: [],
	started: false,
};

const multiplayer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case actions.PLAYERS:
			return {
				...state,
				players: action.payload,
			};
		default:
			return state;
	}
};

export default multiplayer;
