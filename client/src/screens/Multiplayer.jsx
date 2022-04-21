import { Text, View, Share, Button, TextInput, ScrollView } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { join_game, leave_game, start_game, send_nick } from "../actions";
import styles from "../styles";
import socket from "../socket";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useState } from "react";
import Keyboard from "../components/Keyboard";
import LabeledBoard from "../components/LabeledBoard";

const Multiplayer = ({
	players,
	route,
	join_game,
	leave_game,
	start_game,
	send_nick,
	started,
	board,
	nickname,
}) => {
	const [nick, setNick] = useState("");

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

	const playerWonStatus = (id) =>
		players[id].won !== undefined && (
			<Text
				style={{ fontWeight: "bold", color: players[id].won ? "green" : "red" }}
			>
				({players[id].won ? "won" : "lost"})
			</Text>
		);

	return (
		<View style={styles.container}>
			{started ? (
				<>
					<View style={styles.row}>
						<ScrollView horizontal>
							<LabeledBoard board={board}>
								You {playerWonStatus(socket.id)}
							</LabeledBoard>
							{Object.keys(players).map(
								(id) =>
									id !== socket.id && (
										<LabeledBoard key={id} board={players[id].board}>
											{players[id].nickname} {playerWonStatus(id)}
										</LabeledBoard>
									)
							)}
						</ScrollView>
					</View>

					<Keyboard mode="multiplayer" />
				</>
			) : !nickname ? (
				<>
					<Text>Enter your nickname:</Text>
					<TextInput
						style={styles.input}
						value={nick}
						onChangeText={(txt) => setNick(txt)}
					/>
					<Button title="play" onPress={() => send_nick(nick)} />
				</>
			) : (
				<>
					<Text>Joined:</Text>
					{Object.keys(players).map((id) => (
						<Text key={id}>{players[id].nickname}</Text>
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
		multiplayer: { players, started, nickname },
		board: { board },
	},
}) => ({
	players,
	started,
	board,
	nickname,
});
const mapDispatchToProps = (dispatch) =>
	bindActionCreators(
		{ join_game, leave_game, start_game, send_nick },
		dispatch
	);

export default connect(mapStateToProps, mapDispatchToProps)(Multiplayer);
