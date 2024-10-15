import { View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Profile() {
	return (
		<SafeAreaView className="flex flex-1 justify-center items-center">
			<Text>Profile</Text>
		</SafeAreaView>
	);
}
