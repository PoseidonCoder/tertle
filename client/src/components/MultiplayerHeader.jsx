import { Text, View } from "react-native";
import styles from "../styles";
import { AntDesign } from "@expo/vector-icons";
import { connect } from "react-redux";
import { useEffect, useState } from "react";

const MultiplayerHeader = ({ started, time }) => {
	const [delta, setDelta] = useState();

	useEffect(() => {
		const id = setInterval(() => {
			setDelta(new Date(new Date() - time));
		}, 1000);

		return () => clearInterval(id);
	}, [time]);

	return (
		<View
			style={{
				flexDirection: "row",
				flex: 1,
				alignItems: "center",
			}}
		>
			<Text style={styles.headerText}>Multiplayer</Text>

			{started && (
				<View
					style={{
						flexDirection: "row",
						justifyContent: "flex-end",
						flex: 1,
					}}
				>
					{delta && (
						<Text style={styles.headerText}>
							{delta.getMinutes()}:{delta.getSeconds()}
						</Text>
					)}
					<AntDesign
						name="clockcircleo"
						size={18}
						style={{ position: "relative", top: 3, marginHorizontal: 2 }}
						color="black"
					/>
				</View>
			)}
		</View>
	);
};

const mapStateToProps = ({
	multiplayer: {
		multiplayer: { started, time },
	},
}) => ({
	started,
	time,
});

export default connect(mapStateToProps)(MultiplayerHeader);
