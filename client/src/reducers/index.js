import { combineReducers } from "redux";
import singleplayer from "./singleplayer";
import multiplayer from "./multiplayer";

export default combineReducers({ singleplayer, multiplayer });
