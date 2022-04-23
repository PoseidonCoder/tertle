import "react-native-gesture-handler";
import Singleplayer from "./src/screens/Singleplayer";
import SingleplayerHeader from "./src/components/SingleplayerHeader";
import Multiplayer from "./src/screens/Multiplayer";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import store from "./src/store";
import SettingsHeaderRight from "./src/components/SettingsHeaderRight";
import MultiplayerHeaderClock from "./src/components/MultiplayerHeaderClock";
import { createDrawerNavigator } from "@react-navigation/drawer";
import socket from "./src/socket";

const config = {
	screens: {
		Multiplayer: "multiplayer/:id",
		Singleplayer: "singleplayer",
		Home: "home",
	},
};

const linking = {
	prefixes: ["http://localhost:19006/", "t ertle://"],
	config,
};

const Drawer = createDrawerNavigator();

export default function App() {
	return (
		<Provider store={store}>
			<NavigationContainer linking={linking}>
				<Drawer.Navigator
					useLegacyImplementation
					initialRouteName="Singleplayer"
					screenOptions={{
						headerTitleAlign: "center",
						headerStyle: {
							height: 40,
						},
					}}
				>
					<Drawer.Screen
						name="Singleplayer"
						component={Singleplayer}
						options={{
							headerRight: SettingsHeaderRight,
							headerTitle: () => <SingleplayerHeader />,
						}}
					/>
					<Drawer.Screen
						name="Multiplayer"
						component={Multiplayer}
						initialParams={{
							id: socket.id,
						}}
						options={{
							headerRight: () => <MultiplayerHeaderClock />,
						}}
					/>
				</Drawer.Navigator>
			</NavigationContainer>
		</Provider>
	);
}
