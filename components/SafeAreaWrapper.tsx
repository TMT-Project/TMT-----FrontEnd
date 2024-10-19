import React from "react";
import { StatusBar, useColorScheme } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SafeAreaWrapper({
	children,
}: {
	children: React.ReactNode;
}) {
	const colorScheme = useColorScheme();
	return (
		<SafeAreaView className="flex-1 bg-white">
			<StatusBar
				animated={true}
				backgroundColor={colorScheme == "light" ? "#f4f4f5" : "black"}
			/>
			{children}
		</SafeAreaView>
	);
}
