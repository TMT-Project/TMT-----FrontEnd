import { useState } from "react";
import { Text, View } from "react-native";
import { TouchableOpacity } from "react-native";
import {
	responsiveFontSize,
	responsiveWidth,
} from "react-native-responsive-dimensions";

export default function FlightBoard() {
	const [tab, setTab] = useState<"Arrival" | "Departure">("Arrival");
	return (
		<View
			className="flex items-center"
			style={{
				marginVertical: responsiveWidth(5),
			}}
		>
			<View
				className="border border-blue-900 rounded-full flex flex-row items-center justify-between"
				style={{
					padding: responsiveWidth(2),
					width: responsiveWidth(95),
					margin: responsiveWidth(2),
				}}
			>
				<TouchableOpacity
					className="bg-secondary-500 flex flex-row items-center justify-center rounded-3xl"
					style={{
						width: responsiveWidth(45),
						height: responsiveWidth(10),
						backgroundColor: tab === "Arrival" ? "#0286ff" : "white",
					}}
					onPress={() => setTab("Arrival")}
				>
					<Text
						className="text-white font-bold"
						style={{
							fontSize: responsiveFontSize(2),
							color: tab === "Arrival" ? "white" : "black",
						}}
					>
						Arrival
					</Text>
				</TouchableOpacity>

				<TouchableOpacity
					className="bg-primary-500 flex flex-row items-center justify-center rounded-3xl"
					style={{
						width: responsiveWidth(45),
						height: responsiveWidth(10),
						backgroundColor: tab === "Departure" ? "#0286ff" : "white",
					}}
					onPress={() => setTab("Departure")}
				>
					<Text
						className="text-white font-bold"
						style={{
							fontSize: responsiveFontSize(2),
							color: tab === "Departure" ? "white" : "black",
						}}
					>
						Departure
					</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
}
