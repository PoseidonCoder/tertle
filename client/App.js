import Singleplayer from "./src/screens/Singleplayer";
import SingleplayerHeader from "./src/components/SingleplayerHeader";
import MultiplayerHeader from "./src/components/MultiplayerHeader";
import Multiplayer from "./src/screens/Multiplayer";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./src/screens/Home";
import { Provider } from "react-redux";
import { createStore } from "redux";
import reducers from "./src/reducers";

const Stack = createNativeStackNavigator();
const store = createStore(
	reducers,
	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default function App() {
	return (
		<Provider store={store}>
			<NavigationContainer>
				<Stack.Navigator>
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
