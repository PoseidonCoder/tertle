import Anchor from "./Anchor";
import { Modal, Button, Text, TouchableOpacity, View } from "react-native";
import { Feather, AntDesign } from "@expo/vector-icons";
import Divider from "./Divider";
import styles from "../styles";
import { connect } from "react-redux";

const Settings = ({ visible, onClose, answer }) => (
	<Modal visible={visible} animationType="slide" onRequestClose={onClose}>
		<View style={[styles.container, styles.modal]}>
			<View style={styles.modalHeader}>
				<Text style={styles.modalTitle}>SETTINGS</Text>
				<TouchableOpacity onPress={onClose}>
					<Feather name="x" size={25} color="black" style={styles.modalClose} />
				</TouchableOpacity>
			</View>

			<Anchor href="https://github.com/PoseidonCoder/tertle">
				Open in Github
			</Anchor>
			<Divider />
			<Button title="answer" onPress={() => alert(answer)} />
			<Divider />
			<Text style={{ color: "gray" }}>
				Made with <AntDesign name="heart" size={10} color="gray" /> by Lukas D
			</Text>
		</View>
	</Modal>
);

const mapStateToProps = ({
	singleplayer: {
		board: { answer },
	},
}) => ({ answer });

export default connect(mapStateToProps)(Settings);
