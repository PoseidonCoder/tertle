import { Text, View } from "react-native";
import styles from "../styles";
import { AntDesign } from "@expo/vector-icons";
import { connect } from "react-redux";
import { useEffect, useState } from "react";
import * as util from "../util";

const MultiplayerHeader = ({ started, time, finished }) => {
	const [delta, setDelta] = useState();

	const adjustClock = () => {
		console.log(finished);
		if (finished) clearInterval(id);
		else setDelta(new Date(new Date() - time));
	};

	useEffect(() => {
		const id = setInterval(adjustClock, 1000);

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
					}}
				>
					{delta && (
						<Text style={styles.headerText}>
							{util.addExtraZero(delta.getMinutes())}:
							{util.addExtraZero(delta.getSeconds())}
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
		multiplayer: { started, time, finished },
	},
}) => ({
	started,
	time,
	finished,
});

export default connect(mapStateToProps)(MultiplayerHeader);
