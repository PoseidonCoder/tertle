import Settings from "./Settings";
import { useState } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { AntDesign, Fontisto } from "@expo/vector-icons";
import styles from "../styles";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { next, back } from "../actions";

const SingplayerHeader = ({ answer, current, next, back }) => {
	const [showSettings, setShowSettings] = useState(false);

	return (
		<>
			<Settings
				answer={answer}
				visible={showSettings}
				onClose={() => setShowSettings(!showSettings)}
			/>

			<View style={styles.header}>
				<TouchableOpacity onPress={back}>
					<AntDesign name="caretleft" size={18} color="black" />
				</TouchableOpacity>

				<Text style={styles.headerText}>Wordle#{current}</Text>

				<TouchableOpacity onPress={next}>
					<AntDesign name="caretright" size={18} color="black" />
				</TouchableOpacity>

				<TouchableOpacity onPress={() => setShowSettings(!showSettings)}>
					<Fontisto name="spinner-cog" size={18} color="black" />
				</TouchableOpacity>
			</View>
		</>
	);
};

const mapStateToProps = ({ singleplayer: { answer, current } }) => ({
	answer,
	current,
});

const mapDispatchToProps = (dispatch) =>
	bindActionCreators({ next, back }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(SingplayerHeader);
