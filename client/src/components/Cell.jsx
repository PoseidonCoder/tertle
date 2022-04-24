import { Text, Animated } from "react-native";
import styles from "../styles";

const Cell = ({ char }) => (
	<Animated.View
		style={[
			char.color
				? [
						styles.tile,
						{
							backgroundColor: char.color,
							borderWidth: 0,
						},
				  ]
				: styles.tile,
			{
				transform: [{ scale: char.scale }],
			},
		]}
	>
		<Text
			style={[
				styles.tileText,
				{
					color: char.color ? "white" : "black",
				},
			]}
		>
			{char.text}
		</Text>
	</Animated.View>
);

export default Cell;
