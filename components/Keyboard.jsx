import { MaterialCommunityIcons } from "@expo/vector-icons";
import { TouchableOpacity, Text, View } from "react-native";
import styles from "../styles";

const letters = [
	["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
	["a", "s", "d", "f", "g", "h", "j", "k", "l"],
	["z", "x", "c", "v", "b", "n", "m"],
];

export default function Keyboard({
	submit,
	guess,
	board,
	currentRow,
	guessStatus,
	guessValue,
}) {
	return letters.map((row, i) => (
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
							color: board[currentRow.current][4] === "" ? "gray" : "black",
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
					onPress={() => guess(guessValue + letter)}
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
					onPress={() => guess(guessValue.slice(0, -1))}
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
}
