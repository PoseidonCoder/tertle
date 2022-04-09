import { combineReducers } from "redux";
import * as actions from "../constants";
import wordle from "../../wordle.json";
import { charColor, dateToWordle } from "../util";

const boardDefault = [...Array(6)].map((e) => Array(5).fill(""));

const current = dateToWordle(new Date().getTime());

const INITIAL_STATE = {
	board: boardDefault,
	guessValue: "",
	current,
	guessStatus: {},
	currentRow: 0,
	currentColumn: 0,
	renderRows: 0,
	answer: wordle.answers[current],
	wordle,
	won: false,
};

const reducer = (state = INITIAL_STATE, action) => {
	const stateCopy = {
		...state,
		board: [...state.board],
		guessStatus: { ...state.guessStatus },
		wordle: { ...state.wordle },
	};

	const reset = (current) => ({
		...stateCopy,
		current,
		board: boardDefault,
		guessValue: "",
		currentRow: 0,
		currentColumn: 0,
		renderRows: 0,
		won: false,
		guessStatus: {},
		answer: stateCopy.wordle.answers[current],
	});

	switch (action.type) {
		case actions.SUBMITTED:
			if (stateCopy.board[stateCopy.currentRow][4] !== "") {
				if (
					stateCopy.wordle.words.includes(stateCopy.guessValue) ||
					stateCopy.wordle.answers.includes(stateCopy.guessValue)
				) {
					stateCopy.board.forEach((row) => {
						let correct = 0;

						row.forEach((char, i) => {
							const color = charColor(stateCopy.answer, char, i);
							stateCopy.guessStatus[char] = color;

							if (color === "#6aaa64") correct++;
						});

						if (correct === 5) stateCopy.won = true;
					});

					const done = stateCopy.board[5][4] !== "";

					if (!done) stateCopy.currentRow++;
					stateCopy.renderRows++;

					if (!stateCopy.won && done) {
						if (done) alert("The answer was: " + stateCopy.answer);
						else stateCopy.currentColumn = 0;
					}
				} else {
					stateCopy.board[stateCopy.currentRow] = new Array(5).fill("");

					stateCopy.currentColumn = 0;

					alert("Not in word list");
				}

				stateCopy.guessValue = "";
			}

			return stateCopy;

		case actions.TYPED:
			if (
				(action.payload.match(/[a-z]/i) || action.payload == "") &&
				!stateCopy.won &&
				stateCopy.board[5][4] === "" // <= huh?
			) {
				stateCopy.board[stateCopy.currentRow] = stateCopy.board[
					stateCopy.currentRow
				].map((_, i) =>
					action.payload[i] ? action.payload[i].toUpperCase() : ""
				);

				stateCopy.guessValue = action.payload;

				if (stateCopy.board[stateCopy.currentRow][4] === "")
					stateCopy.currentColumn++;

				return stateCopy;
			}

		case actions.NEXT:
			return reset((stateCopy.current += 1));

		case actions.BACK:
			return reset((stateCopy.current -= 1));

		default:
			return state;
	}
};

export default combineReducers({
	singleplayer: reducer,
});
