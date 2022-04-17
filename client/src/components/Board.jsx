import { View, Text } from "react-native";
import styles from "../styles";

const Board = ({ board }) => (
	<View style={{ flexDirection: "column", margin: 5 }}>
		{board.map((row, i) => (
			<View style={styles.row} key={i}>
				{row.map((char, k) => (
					<View
						style={
							char.color
								? [
										styles.tile,
										{
											backgroundColor: char.color,
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
									color: char.color ? "white" : "black",
								},
							]}
						>
							{char.text}
						</Text>
					</View>
				))}
			</View>
		))}
	</View>
);

export default Board;
