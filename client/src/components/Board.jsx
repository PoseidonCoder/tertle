import { View } from "react-native";
import styles from "../styles";
import Cell from "./Cell";

const Board = ({ board }) => (
	<View style={{ flexDirection: "column", margin: 5 }}>
		{board.map((row, i) => (
			<View style={styles.row} key={i}>
				{row.map((char, k) => (
					<Cell char={char} key={i + k} />
				))}
			</View>
		))}
	</View>
);

export default Board;
