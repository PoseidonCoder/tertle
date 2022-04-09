import React, { useCallback } from "react";
import { Text } from "react-native";
import * as Linking from "expo-linking";

export default function Anchor({ href, children }) {
	const handlePress = useCallback(() => {
		Linking.openURL(href);
	});

	return (
		<Text
			onPress={handlePress}
			style={{ textDecorationLine: "underline", color: "gray", fontSize: 15 }}
		>
			{children}
		</Text>
	);
}
