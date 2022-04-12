import { combineReducers } from "redux";
import board from "./board";
import multiplayer from "./multiplayer";

export default combineReducers({ board, multiplayer });
