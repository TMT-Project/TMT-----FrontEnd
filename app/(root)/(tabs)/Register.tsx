import { View, Text, Modal } from "react-native";
import { useState } from "react";
import RadioButtons from "@/components/RadioButtons";
import DatePicker from "@/components/DatePicker";
import KeyboardingAvoidWrapper from "@/components/KeyboardingAvoidWrapper";
import InputField from "@/components/InputField";
import CustomButton from "@/components/CustomButton";
import {
	responsiveFontSize,
	responsiveWidth,
} from "react-native-responsive-dimensions";
import SafeAreaWrapper from "@/components/SafeAreaWrapper";
import { FontAwesome, FontAwesome6, MaterialIcons } from "@expo/vector-icons";

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
						Register
					</Text>
					<Text
						className="text-gray-500"
						style={{
							fontSize: responsiveFontSize(1.8),
						}}
					>
						Register your Trip here
					</Text>
				</View>

				<View
					className="w-full  flex justify-center items-center"
					style={{
						paddingHorizontal: responsiveWidth(3),
					}}
				>
					<View className="flex flex-row mb-2 justify-between items-center w-full">
						<Text
							className="font-medium"
							style={{
								fontSize: responsiveFontSize(2.5),
								marginVertical: responsiveWidth(1.5),
							}}
						>
							Service
						</Text>
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
					<View
						className="w-full"
						style={{
							marginBottom: responsiveWidth(2),
						}}
					>
						<InputField
							placeholder="Flight Number"
							label="Flight Number"
							onChangeText={(text) => handleChange("flightNumber", text)}
							errors={errors.flightNumber}
							value={registerInfo.flightNumber}
							LeftIcon={() => (
								<MaterialIcons name="flight" size={24} color="#0286FF" />
							)}
						/>
					</View>
					<View
						className="w-full"
						style={{
							marginBottom: responsiveWidth(2),
						}}
					>
						<DatePicker
							onChange={(date) => {
								setRegisterInfo({ ...registerInfo, date: date.toDateString() });
							}}
							error={errors.date}
							value={registerInfo.date}
						/>
					</View>
					<View
						className="w-full"
						style={{
							marginBottom: responsiveWidth(2),
						}}
					>
						<InputField
							placeholder="Source"
							label="From"
							editable={false}
							onChangeText={(text) => handleChange("from", text)}
							value={registerInfo.from}
							LeftIcon={() => (
								<MaterialIcons
									name="flight-takeoff"
									size={24}
									color="#0286FF"
								/>
							)}
						/>
					</View>
					<View
						className="w-full"
						style={{
							marginBottom: responsiveWidth(2),
						}}
					>
						<InputField
							placeholder="Destination"
							label="To"
							editable={false}
							onChangeText={(text) => handleChange("to", text)}
							value={registerInfo.to}
							LeftIcon={() => (
								<MaterialIcons name="flight-land" size={24} color="#0286FF" />
							)}
						/>
					</View>
					<View
						className="w-full"
						style={{
							marginBottom: responsiveWidth(2),
						}}
					>
						<InputField
							placeholder="Weight in Kg"
							label="Weight"
							inputMode="numeric"
							onChangeText={(text) => handleChange("weight", text)}
							errors={errors.weight}
							value={registerInfo.weight}
							LeftIcon={() => (
								<FontAwesome6 name="weight-hanging" size={24} color="#0286FF" />
							)}
						/>
					</View>
					<View
						className="w-full"
						style={{
							marginBottom: responsiveWidth(2),
						}}
					>
						<InputField
							placeholder="Enter PNR Number"
							label="PNR Number"
							onChangeText={(text) => handleChange("pnrNumber", text)}
							errors={errors.pnrNumber}
							value={registerInfo.pnrNumber}
							LeftIcon={() => (
								<FontAwesome name="ticket" size={24} color="#0286FF" />
							)}
						/>
					</View>

					<View
						style={{
							marginVertical: responsiveWidth(5),
						}}
					>
						<CustomButton
							title="Register"
							onPress={handleRegister}
							width={responsiveWidth(95)}
						/>
					</View>
				</View>
			</KeyboardingAvoidWrapper>

			<Modal
				visible={modalVisible}
				onRequestClose={() => setModalVisible(false)}
				animationType="fade"
			>
				<View className="flex justify-center items-center h-full">
					<View
						className="flex items-center justify-center border border-black rounded-3xl"
						style={{
							width: responsiveWidth(80),
							paddingHorizontal: responsiveWidth(3),
							paddingVertical: responsiveWidth(5),
							rowGap: responsiveWidth(5),
						}}
					>
						<Text
							style={{
								fontSize: responsiveFontSize(2.4),
								fontWeight: "medium",
								textAlign: "center",
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
							width={responsiveWidth(40)}
						/>
					</View>
				</View>
			</Modal>
		</SafeAreaWrapper>
	);
}
