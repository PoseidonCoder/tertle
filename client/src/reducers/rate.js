import * as util from "../util";
import { set_board } from "../actions";

const rate = (state, action) => {
	const newGuessStatus = { ...state.guessStatus };

	const newBoard = state.board.map((row, i) => {
		if (i != state.currentRow) return row;

		let correct = 0;

		const coloredRow = row.map((char, i) => {
			const color = util.charColor(state.answer, char.text, i);
			char.color = color;
			newGuessStatus[char.text] = color;

			if (color === "#6aaa64") correct++;

			return char;
		});

		if (correct === 5) state.won = true;

		return coloredRow;
	});

	action.asyncDispatch(
		set_board({ board: newBoard, guessStatus: newGuessStatus }, "singleplayer")
	);
};

export default rate;
