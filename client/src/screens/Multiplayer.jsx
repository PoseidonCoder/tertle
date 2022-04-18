import { Text, View, Share, Button } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { join_game, leave_game, start_game } from "../actions";
import styles from "../styles";
import socket from "../socket";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";
import Keyboard from "../components/Keyboard";
import Board from "../components/Board";
import LabeledBoard from "../components/LabeledBoard";

const Multiplayer = ({
	players,
	route,
	join_game,
	leave_game,
	start_game,
	started,
	board,
}) => {
	useFocusEffect(
		useCallback(() => {
			join_game(route.params.id);

			return () => leave_game(route.params.id);
		}, [])
	);

	const shareLink = async () => {
		try {
			await Share.share({ message: "http://localhost:1906" });
		} catch (error) {
			alert(error.message);
		}
	};

	return (
		<View style={styles.container}>
			{started ? (
				<>
					<View style={styles.row}>
						<LabeledBoard board={board}>You</LabeledBoard>
						{Object.keys(players).map(
							(id) =>
								id !== socket.id && (
									<LabeledBoard key={id} board={players[id].board}>
										{id}
									</LabeledBoard>
								)
						)}
					</View>

					<Keyboard mode="multiplayer" />
				</>
			) : (
				<>
					<Text>Joined:</Text>
					{Object.keys(players).map((id) => (
						<Text key={id}>{id}</Text>
					))}
					<Button title="share link" onPress={shareLink} />
					{route.params.id === socket.id && (
						<Button title="start game" onPress={start_game} />
					)}{" "}
				</>
			)}
		</View>
	);
};

const mapStateToProps = ({
	multiplayer: {
		multiplayer: { players, started },
		board: { board },
	},
}) => ({
	players,
	started,
	board,
});
const mapDispatchToProps = (dispatch) =>
	bindActionCreators({ join_game, leave_game, start_game }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Multiplayer);
