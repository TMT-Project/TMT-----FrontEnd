import { View, Text } from "react-native";
import CustomButton from "@/components/CustomButton";
import { Link, router } from "expo-router";
import {
	responsiveHeight,
	responsiveWidth,
} from "react-native-responsive-dimensions";
import SafeAreaWrapper from "@/components/SafeAreaWrapper";

export default function Initial() {
	return (
		<SafeAreaWrapper>
			<View className="flex flex-row items-center">
				<Link href="/(auth)/Welcome">
					<Text className="text-lg text-black font-JakartaBold">Back</Text>
				</Link>
			</View>
			<View
				className="flex flex-1 flex-row items-end justify-evenly"
				style={{
					marginVertical: responsiveHeight(3),
				}}
			>
				<CustomButton
					title="Sign Up"
					onPress={() => router.push("/(auth)/SignUp")}
					width={responsiveWidth(45)}
				/>
				<CustomButton
					onPress={() => router.push("/(auth)/SignIn")}
					title="Sign In"
					width={responsiveWidth(45)}
				/>
			</View>
		</SafeAreaWrapper>
	);
}
