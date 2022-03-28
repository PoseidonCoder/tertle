import { StyleSheet } from "react-native";

export default StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
	row: {
		flexDirection: "row",
	},
	box: {
		borderWidth: 2,
		borderColor: "lightgray",
		width: 50,
		height: 50,
		fontSize: 25,
		margin: 2,
		fontWeight: "bold",
	},
	input: {
		height: 40,
		margin: 12,
		borderWidth: 1,
		padding: 10,
	},
	buttonRow: {
		flexDirection: "row",
	},
	button: {
		margin: 3,
		backgroundColor: "lightgray",
		borderRadius: 4,
		minWidth: 30,
		height: 58,
		fontWeight: "bold",
		alignItems: "center",
		justifyContent: "center",
	},
	header: {
		flexDirection: "row",
	},
	modalHeader: {
		flexDirection: "row",
		justifyContent: "center",
		marginBottom: 15,
	},
	modalTitle: {
		fontSize: 20,
		fontWeight: "bold",
	},
	modalClose: {
		flex: 1,
	},
	modal: {
		width: "50%",
		alignSelf: "center",
	},
});
