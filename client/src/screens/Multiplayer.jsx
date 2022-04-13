import { Text, View } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { join_game, leave_game } from "../actions";
import styles from "../styles";
import socket from "../socket";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";

const Multiplayer = ({ players, route, join_game, leave_game }) => {
	useFocusEffect(
		useCallback(() => {
			join_game(route.params.id);

			return () => leave_game(route.params.id);
		}, [])
	);

	return (
		<View style={styles.container}>
			<Text>Joined:</Text>
			{players.map((player) => (
				<Text key={player}>{player}</Text>
			))}
		</View>
	);
};

const mapStateToProps = ({ multiplayer: { players } }) => ({ players });
const mapDispatchToProps = (dispatch) =>
	bindActionCreators({ join_game, leave_game }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Multiplayer);
