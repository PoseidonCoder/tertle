import { View, Text } from "react-native";
import styles from "../styles";

export default function Board({ board, currentRow, charColor }) {
	return board.map((row, i) => (
		<View style={styles.row} key={i}>
			{row.map((char, k) => (
				<View
					style={
						i < currentRow.current
							? [
									styles.tile,
									{
										backgroundColor: charColor(char, k),
										borderWidth: 0,
									},
							  ]
							: styles.tile
					}
					key={k}
				>
					<Text
						style={[
							styles.tileText,
							{
								color: i < currentRow.current ? "white" : "black",
							},
						]}
					>
						{char}
					</Text>
				</View>
			))}
		</View>
	));
}
