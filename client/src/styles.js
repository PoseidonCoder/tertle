import { StyleSheet } from "react-native";

export default StyleSheet.create({
	headerText: {
		fontSize: 18,
		fontWeight: 500,
		color: "rgb(28, 28, 30)",
	},
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
	row: {
		flexDirection: "row",
	},
	tile: {
		borderWidth: 2,
		borderColor: "lightgray",
		width: 50,
		height: 50,
		margin: 2,
	},
	tileText: {
		margin: "auto",
		fontWeight: "bold",
		fontSize: 25,
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
		textTransform: "uppercase",
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
