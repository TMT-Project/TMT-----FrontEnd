import { View, Text, Modal, Button } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import RadioButtons from "@/components/RadioButtons";
import DatePicker from "@/components/DatePicker";
import KeyboardingAvoidWrapper from "@/components/KeyboardingAvoidWrapper";
import InputField from "@/components/InputField";
import CustomButton from "@/components/CustomButton";
import {
	responsiveFontSize,
	responsiveWidth,
} from "react-native-responsive-dimensions";

type RegisterErrors = {
	flightNumber?: string;
	from?: string;
	to?: string;
	date?: string;
	weight?: string;
	pnrNumber?: string;
	image?: string;
};

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

	const [errors, setErrors] = useState<RegisterErrors>({
		flightNumber: "",
		from: "",
		to: "",
		date: "",
		weight: "",
		pnrNumber: "",
		image: "",
	});

	const [modalVisible, setModalVisible] = useState(false);

	const options = ["Need Help", "Help Others"];

	function handleChange(field: string, value: string) {
		setRegisterInfo({ ...registerInfo, [field]: value });
	}

	function validateForm() {
		let newErrors: RegisterErrors = {};

		if (!registerInfo.flightNumber.trim()) {
			newErrors.flightNumber = "Flight Number is required";
		}

		if (!registerInfo.date.trim()) {
			newErrors.date = "Date is required";
		}

		if (!registerInfo.weight.trim()) {
			newErrors.weight = "Weight is required";
		}

		if (!registerInfo.pnrNumber.trim()) {
			newErrors.pnrNumber = "PNR Number is required";
		}

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	}

	function handleRegister() {
		if (!validateForm()) return;
		console.log(registerInfo);
		// TODO: API call for registering the trip
		setModalVisible(true);
	}

	function resetForm() {
		setErrors({
			flightNumber: "",
			from: "",
			to: "",
			date: "",
			weight: "",
			pnrNumber: "",
			image: "",
		});
		setModalVisible(false);
		setRegisterInfo({
			serviceType: "",
			flightNumber: "",
			from: "",
			to: "",
			date: "",
			weight: "",
			pnrNumber: "",
			image: "",
		});
	}

	return (
		<SafeAreaView className="flex h-full items-center p-3 pt-5 ">
			<View className="flex flex-col items-center justify-center gap-2 mb-5">
				<Text className="text-3xl">Register</Text>
				<Text className="text-lg">Register your Trip here</Text>
			</View>

			<KeyboardingAvoidWrapper>
				<View className="w-full">
					<View className="flex flex-row mb-2 justify-between items-center w-full">
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
					<View className="w-full mb-2">
						<InputField
							placeholder="Flight Number"
							label="Flight Number"
							onChangeText={(text) => handleChange("flightNumber", text)}
							errors={errors.flightNumber}
							value={registerInfo.flightNumber}
						/>
					</View>
					<View className="w-full mb-2">
						<DatePicker
							onChange={(date) => {
								setRegisterInfo({ ...registerInfo, date: date.toDateString() });
							}}
							error={errors.date}
							value={registerInfo.date}
						/>
					</View>
					<View className={"w-full mb-2 flex justify-between"}>
						<InputField
							placeholder="Source"
							label="From"
							editable={false}
							onChangeText={(text) => handleChange("from", text)}
							value={registerInfo.from}
							// errors={errors.from}
						/>
					</View>
					<View className="w-full mb-2">
						<InputField
							placeholder="Destination"
							label="To"
							editable={false}
							onChangeText={(text) => handleChange("to", text)}
							value={registerInfo.to}
							// errors={errors.to}
						/>
					</View>
					<View className="w-full mb-2 flex justify-between">
						<InputField
							placeholder="Weight in Kg"
							label="Weight"
							inputMode="numeric"
							onChangeText={(text) => handleChange("weight", text)}
							errors={errors.weight}
							value={registerInfo.weight}
						/>
					</View>
					<View className="w-full mb-2">
						<InputField
							placeholder="Enter PNR Number"
							label="PNR Number"
							onChangeText={(text) => handleChange("pnrNumber", text)}
							errors={errors.pnrNumber}
							value={registerInfo.pnrNumber}
						/>
					</View>
					{/* <View className="h-[240px] mb-3 w-full border-2 border-dashed flex justify-center items-center">
						<Text className="text-3xl">Upload Image +</Text>
					</View> */}
					<CustomButton
						title="Register"
						onPress={handleRegister}
						className={""}
					/>
				</View>
			</KeyboardingAvoidWrapper>

			<Modal
				visible={modalVisible}
				onRequestClose={() => setModalVisible(false)}
				animationType="fade"
			>
				<View className="flex justify-center items-center h-full">
					<View
						className="flex items-center justify-center gap-y-10 border border-black rounded-3xl p-3"
						style={{
							width: responsiveWidth(80),
						}}
					>
						<Text
							style={{
								fontSize: responsiveFontSize(2.5),
								fontWeight: "medium",
							}}
						>
							Trip Registered Successfully
						</Text>
						<CustomButton
							title="Ok"
							onPress={() => {
								setModalVisible(false);
								resetForm();
							}}
							className="w-1/2"
						/>
					</View>
				</View>
			</Modal>
		</SafeAreaView>
	);
}
