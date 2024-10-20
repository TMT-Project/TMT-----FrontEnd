import { Text, View } from "react-native";
import SafeAreaWrapper from "@/components/SafeAreaWrapper";
import KeyboardingAvoidWrapper from "@/components/KeyboardingAvoidWrapper";
import {
	responsiveFontSize,
	responsiveWidth,
} from "react-native-responsive-dimensions";
import RadioButtons from "@/components/RadioButtons";
import { useState } from "react";
import FlightBoard from "@/components/FlightSearch/FlightBoard";
import FlightNumber from "@/components/FlightSearch/FlightNumber";
import FlightLocation from "@/components/FlightSearch/FlightLocation";

export default function Search() {
	const radioOptions: ("Flight Board" | "Flight Number" | "Location")[] = [
		"Flight Board",
		"Flight Number",
		"Location",
	];

	const [radioOption, setRadioOption] = useState<
		"Flight Board" | "Flight Number" | "Location"
	>(radioOptions[0]);

	return (
		<SafeAreaWrapper>
			<KeyboardingAvoidWrapper>
				<View
					className="w-full items-center"
					style={{
						marginTop: responsiveWidth(10),
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
						Flights
					</Text>
					<Text
						className="text-gray-500"
						style={{
							fontSize: responsiveFontSize(1.8),
						}}
					>
						Search for flights here
					</Text>
				</View>

				<View
					className="w-full flex justify-center items-center"
					style={{
						paddingHorizontal: responsiveWidth(3),
					}}
				>
					<View className="flex flex-row">
						<RadioButtons
							options={radioOptions}
							currentOption={radioOption}
							initialValue={radioOptions[0]}
							setOption={setRadioOption}
							containerStyle="flex flex-row justify-around items-center w-full"
							buttonStyle="flex flex-row items-center"
						/>
					</View>

					{radioOption == "Flight Board" && <FlightBoard />}

					{radioOption == "Flight Number" && <FlightNumber />}

					{radioOption == "Location" && <FlightLocation />}
				</View>
			</KeyboardingAvoidWrapper>
		</SafeAreaWrapper>
	);
}
