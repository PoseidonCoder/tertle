import { Text, View } from "react-native";
import styles from "../styles";
import { AntDesign } from "@expo/vector-icons";
import { connect } from "react-redux";
import { useEffect, useState } from "react";
import * as util from "../util";

const MultiplayerHeaderClock = ({ started, time, finished }) => {
	const [delta, setDelta] = useState();

	useEffect(() => {
		const id = setInterval(
			() =>
				finished ? clearInterval(id) : setDelta(new Date(new Date() - time)),
			1000
		);

		return () => clearInterval(id);
	}, [time, finished]);

	return (
		started && (
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
		)
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

export default connect(mapStateToProps)(MultiplayerHeaderClock);
