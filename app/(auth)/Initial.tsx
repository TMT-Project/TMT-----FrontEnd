import { View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "@/components/CustomButton";
import { router } from "expo-router";

export default function Initial() {
	return (
		<SafeAreaView className="flex h-full items-center justify-center">
			<View className="flex flex-col items-center">
				<CustomButton
					title="Register"
					className="mt-10"
					onPress={() => router.push("/(auth)/SignUp")}
					IconLeft={undefined}
					IconRight={undefined}
					disabled={undefined}
				/>
				<CustomButton
					title="Login"
					className="mt-10"
					onPress={() => router.push("/(auth)/SignIn")}
					IconLeft={undefined}
					IconRight={undefined}
					disabled={undefined}
				/>
			</View>
		</SafeAreaView>
	);
}
