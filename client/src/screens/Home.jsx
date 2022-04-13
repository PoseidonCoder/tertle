import styles from "../styles";
import { Button, SafeAreaView, Text } from "react-native";
import socket from "../socket";

const Home = ({ navigation }) => (
	<SafeAreaView style={styles.container}>
		<Button
			title="singleplayer"
			onPress={() => navigation.navigate("Singleplayer")}
		/>
		<Text>or</Text>
		<Button
			title="create a multiplayer game"
			onPress={() => navigation.push("Multiplayer", { id: socket.id })}
		/>
	</SafeAreaView>
);

export default Home;
