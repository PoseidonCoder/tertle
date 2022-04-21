import { Text, View, TouchableOpacity } from "react-native";
import { AntDesign, Fontisto } from "@expo/vector-icons";
import styles from "../styles";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { next, back } from "../actions";

const SingplayerHeader = ({ current, next, back }) => {
	return (
		<View style={styles.header}>
			<TouchableOpacity style={styles.headerIcon} onPress={back}>
				<AntDesign name="caretleft" size={18} color="black" />
			</TouchableOpacity>

			<Text style={styles.headerText}>Wordle#{current}</Text>

			<TouchableOpacity style={styles.headerIcon} onPress={next}>
				<AntDesign name="caretright" size={18} color="black" />
			</TouchableOpacity>
		</View>
	);
};

const mapStateToProps = ({
	singleplayer: {
		board: { current },
	},
}) => ({
	current,
});

const mapDispatchToProps = (dispatch) =>
	bindActionCreators({ next, back }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(SingplayerHeader);
