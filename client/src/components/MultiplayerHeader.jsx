import { Text, View } from "react-native";
import styles from "../styles";
import { AntDesign } from "@expo/vector-icons";

export default function MultiplayerHeader() {
	return (
		<View
			style={{
				flexDirection: "row",
				flex: 1,
				alignItems: "center",
			}}
		>
			<Text style={styles.headerText}>Multiplayer</Text>

			<View
				style={{
					flexDirection: "row",
					justifyContent: "flex-end",
					flex: 1,
				}}
			>
				<AntDesign
					name="clockcircleo"
					size={18}
					style={{ position: "relative", top: 3, marginHorizontal: 2 }}
					color="black"
				/>
				<Text style={styles.headerText}>0:00</Text>
			</View>
		</View>
	);
}
