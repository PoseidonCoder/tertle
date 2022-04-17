import board from "./domain/board";
import * as util from "../util";
import rate from "./rate";
import { combineReducers } from "redux";

export default combineReducers({
	board: util.createNamedWrapperReducer(board(rate), "singleplayer"),
});
