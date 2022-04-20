import Singleplayer from "./src/screens/Singleplayer";
import SingleplayerHeader from "./src/components/SingleplayerHeader";
import MultiplayerHeader from "./src/components/MultiplayerHeader";
import Multiplayer from "./src/screens/Multiplayer";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./src/screens/Home";
import { Provider } from "react-redux";
import store from "./src/store";

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
					}}
				>
					<Stack.Screen name="Home" component={Home} />
					<Stack.Screen
						name="Singleplayer"
						component={Singleplayer}
						options={() => ({
							headerTitle: () => <SingleplayerHeader />,
						})}
					/>
					<Stack.Screen
						name="Multiplayer"
						component={Multiplayer}
						options={{ headerTitle: () => <MultiplayerHeader /> }}
					/>
				</Stack.Navigator>
			</NavigationContainer>
		</Provider>
	);
}
