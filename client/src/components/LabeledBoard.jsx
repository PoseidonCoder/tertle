import { View, Text } from "react-native";
import Board from "./Board";

const LabeledBoard = ({ board, children }) => (
	<View style={{ flexDirection: "column" }}>
		<Text style={{ textAlign: "center" }}>{children}</Text>
		<Board board={board} />
	</View>
);

export default LabeledBoard;
