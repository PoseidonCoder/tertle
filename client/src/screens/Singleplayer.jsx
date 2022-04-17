import { View } from "react-native";
import styles from "../styles";
import Board from "../components/Board";
import Keyboard from "../components/Keyboard";
import { connect } from "react-redux";

const Singleplayer = ({ board }) => (
	<View style={styles.container}>
		<Board board={board} />
		<Keyboard mode="singleplayer" />
	</View>
);

const mapStateToProps = ({
	singleplayer: {
		board: { board },
	},
}) => ({
	board,
});

export default connect(mapStateToProps)(Singleplayer);
