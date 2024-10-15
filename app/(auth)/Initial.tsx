import { View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "@/components/CustomButton";
import { Link, router } from "expo-router";

export default function Initial() {
	return (
		<SafeAreaView className="flex h-full justify-between">
			<View className="flex flex-row items-center p-5">
				<Link href="/(auth)/Welcome">
					<Text className="text-lg text-black font-JakartaBold">Back</Text>
				</Link>
			</View>
			<View className="flex flex-row items-end justify-center gap-2 p-5">
				<CustomButton
					title="Sign Up"
					onPress={() => router.push("/(auth)/SignUp")}
					className="mt-4 w-1/2"
				/>
				<CustomButton
					onPress={() => router.push("/(auth)/SignIn")}
					title="Sign In"
					className="mt-4 w-1/2"
				/>
			</View>
		</SafeAreaView>
	);
}
