import { View, Text, Image, ScrollView } from "react-native";
import { useEffect, useState } from "react";
import { Link, Redirect } from "expo-router";
import SafeAreaWrapper from "@/components/SafeAreaWrapper";
import {
	responsiveFontSize,
	responsiveWidth,
} from "react-native-responsive-dimensions";
import CustomButton from "@/components/CustomButton";
import { Entypo, FontAwesome6, Ionicons } from "@expo/vector-icons";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";

export default function Details({ tripID }: { tripID: string }) {
	// if (!tripID) {
	// 	return <Redirect href="/(root)/(tabs)/Home" />;
	// }

	const [tripDetails, setTripDetails] = useState({
		tripID: "",
		category: "",
		from: "",
		to: "",
		date: "",
		flightNumber: "",
		PNRNumber: "",
		weight: "",
		price: "",
		tripOwner: "",
		tripOwnerProfileURL: "",
		tripOwnerCountry: "",
	});

	useEffect(() => {
		// TODO: Fetch trip details using tripID
	}, []);

	function handleAcceptTrip() {
		// TODO: Accept the trip
	}

	return (
		<SafeAreaWrapper>
			<ScrollView>
				<View
					className="w-full flex flex-row items-center justify-between"
					style={{
						marginTop: responsiveWidth(1),
						paddingHorizontal: responsiveWidth(5),
						paddingTop: responsiveWidth(5),
					}}
				>
					<Link href="/(root)/(tabs)/Home">
						<FontAwesome6 name="arrow-left-long" size={20} color="#737373" />
					</Link>
					<Entypo name="share" size={24} color="#737373" />
				</View>

				<View
					className="w-full flex items-center"
					style={{
						marginTop: responsiveWidth(5),
						marginBottom: responsiveWidth(6),
					}}
				>
					<Text
						style={{
							fontSize: responsiveFontSize(3),
							marginBottom: responsiveWidth(2),
						}}
						className="text-primary-500 font-bold"
					>
						Trip Details
					</Text>
				</View>

				<View
					className="flex items-center"
					style={{
						paddingHorizontal: responsiveWidth(5),
					}}
				>
					<View
						className="w-full bg-primary-500 rounded-2xl"
						style={{
							height: responsiveWidth(45),
						}}
					></View>

					<View
						style={{
							marginVertical: responsiveWidth(3),
							paddingHorizontal: responsiveWidth(1),
							rowGap: responsiveWidth(4),
						}}
					>
						<View className="w-full flex flex-row justify-between items-center">
							<View
								className="flex flex-row justify-between items-center"
								style={{
									columnGap: responsiveWidth(1.5),
								}}
							>
								<MaterialIcons name="category" size={20} color="#0286FF" />
								<Text
									className="font-bold"
									style={{
										fontSize: responsiveFontSize(2),
									}}
								>
									Category
								</Text>
							</View>
							<Text
								className="text-secondary-800 font-medium"
								style={{
									fontSize: responsiveFontSize(2),
								}}
							>
								{/* {tripDetails.category} */}
								Need Help
							</Text>
						</View>
						<View className="w-full flex flex-row justify-between items-center">
							<View
								className="flex flex-row justify-between items-center"
								style={{
									columnGap: responsiveWidth(1.5),
								}}
							>
								<MaterialIcons
									name="flight-takeoff"
									size={20}
									color="#0286FF"
								/>
								<Text
									className="font-bold"
									style={{
										fontSize: responsiveFontSize(2),
									}}
								>
									From
								</Text>
							</View>
							<Text
								className="text-secondary-800 font-medium"
								style={{
									fontSize: responsiveFontSize(2),
								}}
							>
								{/* {tripDetails.from} */}
								Hyderabad
							</Text>
						</View>
						<View className="w-full flex flex-row justify-between items-center">
							<View
								className="flex flex-row justify-between items-center"
								style={{
									columnGap: responsiveWidth(1.5),
								}}
							>
								<MaterialIcons name="flight-land" size={20} color="#0286FF" />
								<Text
									className="font-bold"
									style={{
										fontSize: responsiveFontSize(2),
									}}
								>
									To
								</Text>
							</View>
							<Text
								className="text-secondary-800 font-medium"
								style={{
									fontSize: responsiveFontSize(2),
								}}
							>
								{/* {tripDetails.to} */}
								Chennai
							</Text>
						</View>
						<View className="w-full flex flex-row justify-between items-center">
							<View
								className="flex flex-row justify-between items-center"
								style={{
									columnGap: responsiveWidth(1.5),
								}}
							>
								<Ionicons name="calendar-clear" size={20} color="#0286FF" />
								<Text
									className="font-bold"
									style={{
										fontSize: responsiveFontSize(2),
									}}
								>
									Date
								</Text>
							</View>

							<Text
								className="text-secondary-800 font-medium"
								style={{
									fontSize: responsiveFontSize(2),
								}}
							>
								{/* {tripDetails.date} */}
								Fri Oct 25 2024
							</Text>
						</View>
						<View className="w-full flex flex-row justify-between items-center">
							<View
								className="flex flex-row justify-between items-center"
								style={{
									columnGap: responsiveWidth(1.5),
								}}
							>
								<MaterialIcons name="flight" size={20} color="#0286FF" />
								<Text
									className="font-bold"
									style={{
										fontSize: responsiveFontSize(2),
									}}
								>
									Flight Number
								</Text>
							</View>

							<Text
								className="text-secondary-800 font-medium"
								style={{
									fontSize: responsiveFontSize(2),
								}}
							>
								{/* {tripDetails.flightNumber} */}
								6E1576
							</Text>
						</View>
						<View className="w-full flex flex-row justify-between items-center">
							<View
								className="flex flex-row justify-between items-center"
								style={{
									columnGap: responsiveWidth(1.5),
								}}
							>
								<FontAwesome name="ticket" size={20} color="#0286FF" />
								<Text
									className="font-bold"
									style={{
										fontSize: responsiveFontSize(2),
									}}
								>
									PNR Number
								</Text>
							</View>
							<Text
								className="text-secondary-800 font-medium"
								style={{
									fontSize: responsiveFontSize(2),
								}}
							>
								{/* {tripDetails.PNRNumber} */}
								1234567890
							</Text>
						</View>
						<View className="w-full flex flex-row justify-between items-center">
							<View
								className="flex flex-row justify-between items-center"
								style={{
									columnGap: responsiveWidth(1.5),
								}}
							>
								<FontAwesome6 name="weight-hanging" size={20} color="#0286FF" />
								<Text
									className="font-bold"
									style={{
										fontSize: responsiveFontSize(2),
									}}
								>
									Weight
								</Text>
							</View>
							<Text
								className="text-secondary-800 font-medium"
								style={{
									fontSize: responsiveFontSize(2),
								}}
							>
								{/* {tripDetails.weight} */}
								10kg
							</Text>
						</View>
						<View className="w-full flex flex-row justify-between items-center">
							<View
								className="flex flex-row justify-between items-center"
								style={{
									columnGap: responsiveWidth(1.5),
								}}
							>
								<Ionicons name="pricetags" size={20} color="#0286FF" />
								<Text
									className="font-bold"
									style={{
										fontSize: responsiveFontSize(2),
									}}
								>
									Price
								</Text>
							</View>
							<Text
								className="text-secondary-800 font-medium"
								style={{
									fontSize: responsiveFontSize(2),
								}}
							>
								{/* {tripDetails.price}$ */}
								100$
							</Text>
						</View>
					</View>

					<View
						className="border border-primary-500 rounded-2xl flex flex-row items-center"
						style={{
							width: responsiveWidth(90),
							height: responsiveWidth(20),
							paddingHorizontal: responsiveWidth(4),
							marginTop: responsiveWidth(4),
							columnGap: responsiveWidth(4),
						}}
					>
						<View
							className="bg-primary-400 rounded-full overflow-hidden"
							style={{
								height: responsiveWidth(15),
								width: responsiveWidth(15),
							}}
						>
							<Image
								source={{
									uri: "https://avatar.iran.liara.run/public/boy",
								}}
								style={{
									height: "100%",
									width: "100%",
								}}
								resizeMode="cover" // This ensures the image covers the container without distortion
							/>
						</View>
						<View>
							<Text
								className="font-bold text-primary-500"
								style={{
									fontSize: responsiveFontSize(2),
								}}
							>
								{/* {tripDetails.tripOwner} */}
								John Doe
							</Text>
							<Text
								className="font-medium text-primary-500"
								style={{
									fontSize: responsiveFontSize(1.8),
								}}
							>
								{/* {tripDetails.tripOwnerCountry} */}
								India
							</Text>
						</View>
					</View>
				</View>

				<View
					className="flex items-center"
					style={{
						marginVertical: responsiveWidth(5),
						paddingHorizontal: responsiveWidth(5),
					}}
				>
					<CustomButton
						title="Accept Trip"
						onPress={handleAcceptTrip}
						width={responsiveWidth(90)}
					/>
				</View>
			</ScrollView>
		</SafeAreaWrapper>
	);
}
