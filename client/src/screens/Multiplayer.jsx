import { Text, View, Share, Button } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { join_game, leave_game, start_game } from "../actions";
import styles from "../styles";
import socket from "../socket";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";

const Multiplayer = ({ players, route, join_game, leave_game, start_game }) => {
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
			<Text>Joined:</Text>

			{players.map((player) => (
				<Text key={player}>{player}</Text>
			))}

			<Button title="share link" onPress={shareLink} />
			{route.params.id === socket.id && (
				<Button title="start game" onPress={startGame} />
			)}
		</View>
	);
};

const mapStateToProps = ({ multiplayer: { players } }) => ({ players });
const mapDispatchToProps = (dispatch) =>
	bindActionCreators({ join_game, leave_game, start_game }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Multiplayer);
