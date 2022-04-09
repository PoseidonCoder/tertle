import { View } from "react-native";
import styles from "../styles";
import Board from "../components/Board";
import Keyboard from "../components/Keyboard";

const Singleplayer = () => (
	<View style={styles.container}>
		<Board />
		<Keyboard />
	</View>
);

export default Singleplayer;
