import { Text, View } from "react-native";
import SafeAreaWrapper from "@/components/SafeAreaWrapper";
import KeyboardingAvoidWrapper from "@/components/KeyboardingAvoidWrapper";
import {
	responsiveFontSize,
	responsiveWidth,
} from "react-native-responsive-dimensions";
import RadioButtons from "@/components/RadioButtons";

export default function Search() {
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

				<View>
					<View>{/* <RadioButtons  /> */}</View>
				</View>
			</KeyboardingAvoidWrapper>
		</SafeAreaWrapper>
	);
}
