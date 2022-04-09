import { Text, View, TouchableOpacity, Button } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import styles from "../styles";
import { io } from "socket.io-client";
import { useState } from "react";

// const socket = io("ws://localhost:3000");

const Multiplayer = ({ navigation }) => (
	<Text style={{ fontSize: 50 }}>Coming soon...</Text>
);
// const [createGameScreen, setCreateGameScreen] = useState();

// return createGameScreen == undefined ? (
// 	<>
// 		<Button title="Create Game" onPress={() => setCreateGameScreen(true)} />
// 		<Text>or</Text>
// 		<Button title="Join Game" onPress={() => setCreateGameScreen(false)} />
// 	</>
// ) : createGameScreen ? (
// 	<Text>create game</Text>
// ) : (
// 	<Text>join game</Text>
// );

export default Multiplayer;
