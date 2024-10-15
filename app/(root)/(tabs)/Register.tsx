import { View, Text, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import RadioButtons from "@/components/RadioButtons";
import DatePicker from "@/components/DatePicker";
import KeyboardingAvoidWrapper from "@/components/KeyboardingAvoidWrapper";
import InputField from "@/components/InputField";

export default function Register() {
	const [option, setOption] = useState("");

	const [registerInfo, setRegisterInfo] = useState({
		serviceType: "",
		flightNumber: "",
		from: "",
		to: "",
		date: "",
		weight: "",
		pnrNumber: "",
		image: "",
	});

	const options = ["Need Help", "Help Others"];

	function handleChange(field: string, value: string) {
		setRegisterInfo({ ...registerInfo, [field]: value });
	}

	function handleRegister() {
		console.log(registerInfo);
	}

	return (
		<SafeAreaView className="flex flex-1 items-center px-3 pt-5">
			<Text className="text-3xl">Register</Text>
			<KeyboardingAvoidWrapper>
				<View className="w-full">
					<View className="flex flex-row mb-3 justify-around items-center w-full">
						<Text className="text-xl font-medium">Service</Text>
						<RadioButtons
							currentOption={option}
							setOption={setOption}
							options={options}
							containerStyle="flex flex-row m-2 p-2 items-center justify-center gap-x-5"
							buttonStyle="flex flex-row items-center"
							textStyle="text-lg"
							initialValue={options[0]}
							onChanged={(value) => handleChange("serviceType", value)}
						/>
					</View>
					<View className="w-full mb-3">
						<InputField
							placeholder="Flight Number"
							inputStyle="border border-black w-full text-2xl"
							inputContainerStyle="border-0"
							onChangeText={(text) => handleChange("flightNumber", text)}
						/>
					</View>
					<View className="w-full mb-3 flex flex-row justify-between gap-x-1">
						<InputField
							placeholder="From"
							inputStyle="border border-black p-3 w-full text-2xl"
							containerStyle="w-1/2"
							inputContainerStyle="border-0"
							editable={false}
							onChangeText={(text) => handleChange("from", text)}
						/>
						<InputField
							placeholder="To"
							inputStyle="border border-black p-3 w-full text-2xl"
							containerStyle="w-1/2"
							inputContainerStyle="border-0"
							editable={false}
							onChangeText={(text) => handleChange("to", text)}
						/>
					</View>
					<View className="w-full mb-3">
						<DatePicker
							onChange={(date) => {
								setRegisterInfo({ ...registerInfo, date: date.toDateString() });
							}}
						/>
					</View>
					<View className="w-full mb-3 flex flex-row justify-between gap-x-1">
						<InputField
							placeholder="Weight in Kg"
							inputStyle="border border-black p-3 w-full text-2xl"
							containerStyle="w-1/2"
							inputContainerStyle="border-0"
							inputMode="numeric"
							onChangeText={(text) => handleChange("weight", text)}
						/>
						<InputField
							placeholder="PNR Number"
							inputStyle="border border-black p-3 w-full text-2xl"
							containerStyle="w-1/2"
							inputContainerStyle="border-0"
							onChangeText={(text) => handleChange("pnrNumber", text)}
						/>
					</View>
					<View className="h-[250px] mb-3 w-full border-2 border-dashed flex justify-center items-center">
						<Text className="text-3xl">Upload Image +</Text>
					</View>
					<TouchableOpacity onPress={handleRegister} className="">
						<Text className="text-2xl text-center text-white bg-black p-3 rounded-lg">
							Register
						</Text>
					</TouchableOpacity>
				</View>
			</KeyboardingAvoidWrapper>
		</SafeAreaView>
	);
}
