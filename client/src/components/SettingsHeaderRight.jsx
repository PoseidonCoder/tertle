import { useState } from "react";
import Settings from "./Settings";
import { TouchableOpacity } from "react-native";
import { Fontisto } from "@expo/vector-icons";
import styles from "../styles";

const SettingsHeaderRight = () => {
	const [showSettings, setShowSettings] = useState(false);

	return (
		<>
			<Settings
				visible={showSettings}
				onClose={() => setShowSettings(!showSettings)}
			/>

			<TouchableOpacity
				style={styles.headerIcon}
				onPress={() => setShowSettings(!showSettings)}
			>
				<Fontisto name="spinner-cog" size={18} color="black" />
			</TouchableOpacity>
		</>
	);
};

export default SettingsHeaderRight;
