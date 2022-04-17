import * as actions from "../../constants";
import wordle from "../../../wordle.json";
import * as util from "../../util";

const submit = (state, action, { rate }) => {
	if (state.board[state.currentRow][4].text === "") return state;

	if (
		state.wordle.words.includes(state.guessValue) ||
		state.wordle.answers.includes(state.guessValue)
	) {
		const done = state.board[5][4].text !== "";

		if (!state.won && done) alert("The answer was: " + state.answer);

		rate(state, action);

		return util.updateObject(state, {
			currentRow: done ? state.currentRow : (state.currentRow += 1),
			currentColumn: 0,
			guessValue: "",
		});
	} else {
		alert("Not in word list");

		return util.updateObject(state, {
			board: state.board.map((row, i) =>
				state.currentRow === i ? new Array(5).fill("") : row
			),
			currentColumn: 0,
			guessValue: "",
		});
	}
};

const type = (state, action) =>
	(action.payload.match(/[a-z]/i) || action.payload == "") &&
	!state.won &&
	action.payload.length < 6
		? util.updateObject(state, {
				board: state.board.map((row, i) =>
					i === state.currentRow
						? row.map((_, k) => ({
								text: action.payload[k] ? action.payload[k].toUpperCase() : "",
						  }))
						: row
				),
				guessValue: action.payload,
				currentColumn: state.currentColumn++,
		  })
		: state;

const reset = (state, current) => ({
	...state,
	current,
	board: boardDefault,
	guessValue: "",
	currentRow: 0,
	currentColumn: 0,
	won: false,
	guessStatus: {},
	answer: state.wordle.answers[current],
});

const boardDefault = [...Array(6)].map(() => Array(5).fill({ text: "" }));

const current = util.dateToWordle(new Date().getTime());

const INITIAL_STATE = {
	board: boardDefault,
	guessValue: "",
	current,
	guessStatus: {},
	currentRow: 0,
	currentColumn: 0,
	answer: wordle.answers[current],
	wordle,
	won: false,
};

export default (rate) =>
	util.createReducer(
		INITIAL_STATE,
		{
			[actions.SUBMITTED]: submit,
			[actions.TYPED]: type,
			[actions.NEXT]: (state) => reset(state, (state.current += 1)),
			[actions.BACK]: (state) => reset(state, (state.current -= 1)),
			[actions.SETTED_BOARD]: (state, { payload: { board, guessStatus } }) =>
				util.updateObject(state, { board, guessStatus }),
		},
		{ rate }
	);
