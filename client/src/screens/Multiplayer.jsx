import { Text, View, TouchableOpacity, Button } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { join_game } from "../actions";
import { useEffect } from "react";
import styles from "../styles";
import socket from "../socket";

const Multiplayer = ({ players, route, join_game }) => {
	useEffect(() => join_game(route?.params?.id), []);

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
	bindActionCreators({ join_game }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Multiplayer);
