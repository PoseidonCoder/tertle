import { MaterialCommunityIcons } from "@expo/vector-icons";
import { TouchableOpacity, Text, View } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import styles from "../styles";
import { submit, type } from "../actions";

const letters = [
	["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
	["a", "s", "d", "f", "g", "h", "j", "k", "l"],
	["z", "x", "c", "v", "b", "n", "m"],
];

const Keyboard = ({
	submit,
	type,
	board,
	currentRow,
	guessStatus,
	guessValue,
}) =>
	letters.map((row, i) => (
		<View key={i} style={styles.buttonRow}>
			{i === 2 && (
				<TouchableOpacity
					style={[
						styles.button,
						{
							width: 60,
						},
					]}
					onPress={submit}
				>
					<Text
						style={{
							color: board[currentRow][4] === "" ? "gray" : "black",
							fontWeight: "bold",
						}}
					>
						enter
					</Text>
				</TouchableOpacity>
			)}
			{row.map((letter, k) => (
				<TouchableOpacity
					style={
						guessStatus[letter.toUpperCase()]
							? [
									styles.button,
									{
										backgroundColor: guessStatus[letter.toUpperCase()],
									},
							  ]
							: styles.button
					}
					key={k}
					onPress={() => type(guessValue + letter)}
				>
					<Text
						style={{
							fontSize: 20,
							color: guessStatus[letter.toUpperCase()] ? "white" : "black",
						}}
					>
						{letter.toUpperCase()}
					</Text>
				</TouchableOpacity>
			))}
			{i === 2 && (
				<TouchableOpacity
					style={[styles.button, { width: 50 }]}
					onPress={() => type(guessValue.slice(0, -1))}
				>
					<MaterialCommunityIcons
						name="backspace-outline"
						size={30}
						color="black"
					/>
				</TouchableOpacity>
			)}
		</View>
	));

const mapStateToProps = (state, { mode }) => ({
	submit: state[mode].board.submit,
	guess: state[mode].board.guess,
	board: state[mode].board.board,
	currentRow: state[mode].board.currentRow,
	guessStatus: state[mode].board.guessStatus,
	guessValue: state[mode].board.guessValue,
});

const mapDispatchToProps = (dispatch, { mode }) =>
	bindActionCreators({ submit: submit(mode), type: type(mode) }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Keyboard);
