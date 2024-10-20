import SafeAreaWrapper from "@/components/SafeAreaWrapper";
import {
	Feather,
	FontAwesome6,
	Ionicons,
	MaterialIcons,
} from "@expo/vector-icons";
import { Link } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import {
	responsiveFontSize,
	responsiveWidth,
} from "react-native-responsive-dimensions";
import TabWrapper from "@/components/TabWrapper";
import { router } from "expo-router";

export default function Profile() {
	return (
		<SafeAreaWrapper>
			{/* Header */}
			<View
				className="w-full flex flex-row items-center justify-between"
				style={{
					marginTop: responsiveWidth(1),
					padding: responsiveWidth(5),
				}}
			>
				<Link href="/(root)/(tabs)/Home">
					<FontAwesome6 name="arrow-left-long" size={24} color="#737373" />
				</Link>
				<TouchableOpacity onPress={() => router.push("/(root)/ProfileEdit")}>
					<FontAwesome6 name="edit" size={24} color="#737373" />
				</TouchableOpacity>
			</View>
			{/* Profile */}
			<View
				className="w-full flex flex-col items-center"
				style={{
					flex: 1,
					marginTop: responsiveWidth(3),
				}}
			>
				{/* Profile Image */}
				<View className="flex flex-col items-center" style={{}}>
					<View
						className="bg-red-500"
						style={{
							width: responsiveWidth(40),
							height: responsiveWidth(40),
							borderRadius: responsiveWidth(25),
							alignSelf: "center",
						}}
					>
						{/* TODO: Profile Image */}
					</View>
					{/* Profile Details */}
					<Text
						style={{
							marginTop: responsiveWidth(3),
							fontSize: responsiveFontSize(3),
							fontWeight: "bold",
						}}
					>
						John Deo
					</Text>
					<Text
						className="text-gray-500"
						style={{ fontSize: responsiveFontSize(2) }}
					>
						johndeo@gmail.com
					</Text>
				</View>
				{/* Tabs */}
				<View
					className="w-full flex flex-col items-center justify-evenly"
					style={{
						marginTop: responsiveWidth(8),
						paddingHorizontal: responsiveWidth(3.5),
						gap: responsiveWidth(4),
					}}
				>
					{/* History */}
					<TabWrapper
						LeftIcon={() => (
							<MaterialIcons name="work-history" size={24} color="black" />
						)}
						RightIcon={() => (
							<Feather name="chevron-right" size={24} color="black" />
						)}
						label="History"
						event={() => {
							router.push("/(root)/(tabs)/History");
						}}
					/>

					{/* Notification */}
					<TabWrapper
						LeftIcon={() => (
							<MaterialIcons name="notifications" size={24} color="black" />
						)}
						RightIcon={() => (
							<Feather name="chevron-right" size={24} color="black" />
						)}
						label="Notification"
						event={() => {
							router.push("/(root)/Notifications");
						}}
					/>

					{/* FAQs */}
					<TabWrapper
						LeftIcon={() => (
							<Ionicons name="help-circle" size={24} color="black" />
						)}
						RightIcon={() => (
							<Feather name="chevron-right" size={24} color="black" />
						)}
						label="FAQs"
						event={() => {
							router.push("/(root)/Faqs");
						}}
					/>

					{/* Privacy */}
					<TabWrapper
						LeftIcon={() => (
							<MaterialIcons name="privacy-tip" size={24} color="black" />
						)}
						RightIcon={() => (
							<Feather name="chevron-right" size={24} color="black" />
						)}
						label="Privacy Policy"
						event={() => {
							router.push("/(root)/Privacy");
						}}
					/>

					{/* Logout */}
					<TabWrapper
						LeftIcon={() => (
							<MaterialIcons name="logout" size={24} color="black" />
						)}
						RightIcon={() => (
							<Feather name="chevron-right" size={24} color="black" />
						)}
						label="Logout"
					/>
				</View>
			</View>
		</SafeAreaWrapper>
	);
}
