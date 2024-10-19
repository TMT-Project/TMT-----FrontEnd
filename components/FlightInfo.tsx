import { View, Text, Image } from "react-native";
import React from "react";
import { responsiveWidth } from "react-native-responsive-dimensions";
import FlightTravelSVG from "../assets/icons/flight-travel.svg";

export default function FlightInfo() {
	return (
		<View>
			<View
				className="bg-gray-600 rounded-md"
				style={{
					width: responsiveWidth(15),
					height: responsiveWidth(15),
					aspectRatio: 1,
				}}
			></View>
			<View className="">
				<View>
					<Text>00:00</Text>
					<Text>6E6470</Text>
					<Text>09:00</Text>
				</View>
				<View>
					<Text>HYD</Text>
					<Image source={FlightTravelSVG} />
					<Text>MAA</Text>
				</View>
				<View></View>
			</View>
		</View>
	);
}
