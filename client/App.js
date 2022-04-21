import Singleplayer from "./src/screens/Singleplayer";
import SingleplayerHeader from "./src/components/SingleplayerHeader";
import Multiplayer from "./src/screens/Multiplayer";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./src/screens/Home";
import { Provider } from "react-redux";
import store from "./src/store";
import SettingsHeaderRight from "./src/components/SettingsHeaderRight";
import styles from "./src/styles";
import MultiplayerHeaderClock from "./src/components/MultiplayerHeaderClock";
import { Text } from "react-native";

const Stack = createNativeStackNavigator();

const config = {
	screens: {
		Multiplayer: "multiplayer/:id",
		Singleplayer: "singleplayer",
		Home: "home",
	},
};

const linking = {
	prefixes: ["http://localhost:19006/", "tertle://"],
	config,
};

export default function App() {
	return (
		<Provider store={store}>
			<NavigationContainer linking={linking}>
				<Stack.Navigator
					screenOptions={{
						headerTitleAlign: "center",
						headerStyle: {
							height: 40,
						},
					}}
				>
					<Stack.Screen name="Home" component={Home} />
					<Stack.Screen
						name="Singleplayer"
						component={Singleplayer}
						options={() => ({
							headerTitle: SingleplayerHeader,
							headerRight: SettingsHeaderRight,
						})}
					/>
					<Stack.Screen
						name="Multiplayer"
						component={Multiplayer}
						options={{
							headerTitle: () => (
								<Text style={styles.headerText}>Multiplayer</Text>
							),
							headerRight: () => <MultiplayerHeaderClock />,
						}}
					/>
				</Stack.Navigator>
			</NavigationContainer>
		</Provider>
	);
}
