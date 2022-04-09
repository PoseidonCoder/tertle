import styles from "../styles";
import { Button, SafeAreaView, Text } from "react-native";

export default function Home({ navigation }) {
	return (
		<SafeAreaView style={styles.container}>
			<Button
				title="singleplayer"
				onPress={() => navigation.navigate("Singleplayer")}
			/>
			<Text>or</Text>
			<Button
				title="multiplayer"
				onPress={() => navigation.navigate("Multiplayer")}
			/>
		</SafeAreaView>
	);
}
