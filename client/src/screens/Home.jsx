import styles from "../styles";
import { Button, SafeAreaView, Text } from "react-native";
import { connect, useDispatch } from "react-redux";
import { join_game } from "../actions";

const Home = ({ navigation, players }) => {
	const dispatch = useDispatch();

	if (players.length > 0) navigation.navigate("Multiplayer");

	return (
		<SafeAreaView style={styles.container}>
			<Button
				title="singleplayer"
				onPress={() => navigation.navigate("Singleplayer")}
			/>
			<Text>or</Text>
			<Button
				title="create a multiplayer game"
				onPress={() => dispatch(join_game())}
			/>
		</SafeAreaView>
	);
};

const mapStateToProps = ({ multiplayer: { players } }) => ({ players });

export default connect(mapStateToProps)(Home);
