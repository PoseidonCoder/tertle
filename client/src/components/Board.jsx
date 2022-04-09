import { View, Text } from "react-native";
import { connect } from "react-redux";
import styles from "../styles";
import { charColor } from "../util";

const Board = ({ board, renderRows, answer }) =>
	board.map((row, i) => (
		<View style={styles.row} key={i}>
			{row.map((char, k) => (
				<View
					style={
						i < renderRows
							? [
									styles.tile,
									{
										backgroundColor: charColor(answer, char, k),
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
								color: i < renderRows ? "white" : "black",
							},
						]}
					>
						{char}
					</Text>
				</View>
			))}
		</View>
	));

const mapStateToProps = ({ singleplayer: { board, renderRows, answer } }) => ({
	board,
	renderRows,
	answer,
});

export default connect(mapStateToProps)(Board);
