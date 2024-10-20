import { View } from "react-native";
import { useState } from "react";
import { responsiveWidth } from "react-native-responsive-dimensions";
import InputField from "../InputField";
import { MaterialIcons } from "@expo/vector-icons";
import DatePicker from "../DatePicker";
import CustomButton from "../CustomButton";

export default function FlightLocation() {
	const [flightInfo, setFlightInfo] = useState({
		flightNumber: "",
		date: "",
	});

	const [errors, setErrors] = useState({
		flightNumber: "",
		date: "",
	});

	function handleChange(key: string, value: string) {
		setFlightInfo({ ...flightInfo, [key]: value });
	}

	function handleSearch() {
		// TODO: Make API call to search for flight
	}

	return (
		<View
			className="w-full flex items-center"
			style={{
				marginVertical: responsiveWidth(5),
			}}
		>
			<View
				className="w-full flex flex-row justify-around items-center"
				style={{
					columnGap: responsiveWidth(2),
				}}
			>
				<InputField
					placeholder="Source"
					onChangeText={(text) => handleChange("from", text)}
					containerStyle="flex-1"
					// value={registerInfo.from}
					LeftIcon={() => (
						<MaterialIcons name="flight-takeoff" size={24} color="#0286FF" />
					)}
				/>

				<InputField
					placeholder="Destination"
					onChangeText={(text) => handleChange("to", text)}
					containerStyle="flex-1"
					// value={registerInfo.to}
					LeftIcon={() => (
						<MaterialIcons name="flight-land" size={24} color="#0286FF" />
					)}
				/>
			</View>
			<View className="w-full">
				<DatePicker
					onChange={(date) => {
						setFlightInfo({ ...flightInfo, date: date.toDateString() });
					}}
					error={errors.date}
					value={flightInfo.date}
				/>
			</View>
			<View
				style={{
					marginVertical: responsiveWidth(1.5),
				}}
			>
				<CustomButton
					title="Search"
					onPress={handleSearch}
					width={responsiveWidth(95)}
				/>
			</View>
		</View>
	);
}
