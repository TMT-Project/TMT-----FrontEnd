import {
	View,
	Text,
	TextInput,
	TouchableOpacity,
	Alert,
	Platform,
} from "react-native";
import { useState, useRef, useEffect } from "react";
import { Link, router, useLocalSearchParams } from "expo-router";
import KeyboardingAvoidWrapper from "../../components/KeyboardingAvoidWrapper";
import CustomButton from "../../components/CustomButton";
import SafeAreaWrapper from "@/components/SafeAreaWrapper";
import {
	responsiveFontSize,
	responsiveWidth,
} from "react-native-responsive-dimensions";
import { FontAwesome6 } from "@expo/vector-icons";

export default function Otp() {
	const BASE_URL = process.env.EXPO_PUBLIC_BASE_URL;

	const [count, setCount] = useState(10);

	const { email } = useLocalSearchParams();

	const otp1 = useRef<TextInput | null>(null);
	const otp2 = useRef<TextInput | null>(null);
	const otp3 = useRef<TextInput | null>(null);
	const otp4 = useRef<TextInput | null>(null);

	const [otp, setOtp] = useState({
		otp1: "",
		otp2: "",
		otp3: "",
		otp4: "",
	});

	const [errors, setErrors] = useState("");

	useEffect(() => {
		const interval = setInterval(() => {
			if (count === 0) {
				clearInterval(interval);
			} else {
				setCount(count - 1);
			}
		}, 1000);
		return () => clearInterval(interval);
	}, [count]);

	const validateForm = () => {
		if (
			otp.otp1 === "" ||
			otp.otp2 === "" ||
			otp.otp3 === "" ||
			otp.otp4 === ""
		) {
			setErrors("OTP Invalid");
			console.log("otp not valid");
			return false;
		}

		if (
			otp.otp1.match(/^[0-9]$/) == null ||
			otp.otp2.match(/^[0-9]$/) == null ||
			otp.otp3.match(/^[0-9]$/) == null ||
			otp.otp4.match(/^[0-9]$/) == null
		) {
			setErrors("OTP Invalid");
			console.log("otp not valid");
			return false;
		}

		return true;
	};

	const onVerifyPress = async () => {
		console.log(otp);

		router.push("/(auth)/ResetPassword");

		if (!validateForm()) {
			console.log("otp not valid");
			Alert.alert("otp not valid");
			return;
		}

		let enteredOtp = otp.otp1 + otp.otp2 + otp.otp3 + otp.otp4;

		console.log("entered otp: " + enteredOtp);

		const response = await fetch(
			`${BASE_URL}/auth/verify?otp=${enteredOtp}&email=${email}`,
		);

		if (response.ok) {
			console.log("otp valid");
			router.push("/(auth)/SignIn");
		} else {
			console.log("otp not valid");
			Alert.alert("Invalid OTP");
			return;
		}
	};

	const onResend = () => {
		setCount(10);
		// TODO: API call to resend otp
		console.log(otp);
	};

	return (
		<SafeAreaWrapper>
			<View
				className="w-full flex flex-row items-center"
				style={{
					marginTop: responsiveWidth(1),
					padding: responsiveWidth(5),
				}}
			>
				<Link href="/(auth)/SignIn">
					<FontAwesome6 name="arrow-left-long" size={20} color="#737373" />
				</Link>
			</View>
			<KeyboardingAvoidWrapper>
				<View
					className="w-full items-center"
					style={{
						marginTop: responsiveWidth(5),
					}}
				>
					<Text
						className="tracking-widest text-primary-500 font-bold"
						style={{
							fontSize: responsiveFontSize(3),
							marginBottom: responsiveWidth(2),
						}}
					>
						Enter Verification Code
					</Text>
					<Text
						className="text-gray-500"
						style={{
							fontSize: responsiveFontSize(1.8),
						}}
					>
						We have sent to your inbox
					</Text>
				</View>
				<View
					className="w-full flex flex-col justify-center items-center"
					style={{
						marginVertical: responsiveWidth(5),
					}}
				>
					<View
						className="w-full flex flex-row justify-center items-center"
						style={{
							paddingVertical: responsiveWidth(5),
						}}
					>
						<TextInput
							ref={otp1}
							maxLength={1}
							keyboardType={
								Platform.OS === "ios" ? "name-phone-pad" : "numeric"
							}
							className="border border-neutral-300 rounded-xl text-center focus:border-primary-500"
							style={{
								marginRight: responsiveWidth(5),
								height: responsiveWidth(15),
								width: responsiveWidth(15),
								padding: responsiveWidth(2),
								fontSize: responsiveFontSize(3),
							}}
							value={otp.otp1}
							onChangeText={(txt) => {
								setOtp({ ...otp, otp1: txt });

								if (txt.length >= 1 && txt.match(/^[0-9]$/) !== null) {
									otp2.current?.focus();
								}
							}}
							onKeyPress={(e) => {
								if (e.nativeEvent.key === "Backspace" && otp.otp1 === "") {
									otp1.current?.focus();
								}
							}}
						/>
						<TextInput
							ref={otp2}
							maxLength={1}
							keyboardType={
								Platform.OS === "ios" ? "name-phone-pad" : "numeric"
							}
							className="border border-neutral-300 rounded-xl text-center focus:border-primary-500"
							style={{
								marginRight: responsiveWidth(5),
								height: responsiveWidth(15),
								width: responsiveWidth(15),
								padding: responsiveWidth(2),
								fontSize: responsiveFontSize(3),
							}}
							value={otp.otp2}
							onChangeText={(txt) => {
								setOtp({ ...otp, otp2: txt });
								if (txt.length >= 1 && txt.match(/^[0-9]$/) !== null) {
									otp3.current?.focus();
								}
							}}
							onKeyPress={(e) => {
								if (e.nativeEvent.key === "Backspace" && otp.otp2 === "") {
									otp1.current?.focus();
								}
							}}
						/>
						<TextInput
							ref={otp3}
							maxLength={1}
							keyboardType={
								Platform.OS === "ios" ? "name-phone-pad" : "numeric"
							}
							className="border border-neutral-300 rounded-xl text-center focus:border-primary-500"
							style={{
								marginRight: responsiveWidth(5),
								height: responsiveWidth(15),
								width: responsiveWidth(15),
								padding: responsiveWidth(2),
								fontSize: responsiveFontSize(3),
							}}
							value={otp.otp3}
							onChangeText={(txt) => {
								setOtp({ ...otp, otp3: txt });
								if (txt.length >= 1 && txt.match(/^[0-9]$/) !== null) {
									otp4.current?.focus();
								}
							}}
							onKeyPress={(e) => {
								if (e.nativeEvent.key === "Backspace" && otp.otp3 === "") {
									otp2.current?.focus();
								}
							}}
						/>
						<TextInput
							ref={otp4}
							maxLength={1}
							keyboardType={
								Platform.OS === "ios" ? "name-phone-pad" : "numeric"
							}
							className="border border-neutral-300 rounded-xl text-center focus:border-primary-500"
							style={{
								marginRight: responsiveWidth(5),
								height: responsiveWidth(15),
								width: responsiveWidth(15),
								padding: responsiveWidth(2),
								fontSize: responsiveFontSize(3),
							}}
							value={otp.otp4}
							onChangeText={(txt) => {
								setOtp({ ...otp, otp4: txt });
							}}
							onKeyPress={(e) => {
								if (e.nativeEvent.key === "Backspace" && otp.otp4 === "") {
									otp3.current?.focus();
								}
							}}
						/>
					</View>

					{/* Buttons */}
					<View
						className="w-full flex flex-col justify-center items-center"
						style={{
							marginTop: responsiveWidth(2),
						}}
					>
						<CustomButton
							title="Verify"
							bgVariant={`${
								otp.otp1 !== "" &&
								otp.otp2 !== "" &&
								otp.otp3 !== "" &&
								otp.otp4 !== ""
									? "primary"
									: "secondary"
							}`}
							onPress={onVerifyPress}
							disabled={
								otp.otp1 !== "" &&
								otp.otp2 !== "" &&
								otp.otp3 !== "" &&
								otp.otp4 !== ""
									? false
									: true
							}
							width={responsiveWidth(95)}
						/>
					</View>

					{/* Timer */}
					<View
						className="w-full flex flex-row justify-center items-center"
						style={{
							marginTop: responsiveWidth(2),
						}}
					>
						{count === 0 ? (
							<TouchableOpacity
								className="w-full flex justify-center items-center"
								onPress={onResend}
							>
								<Text
									className=" text-[#0286ff] font-bold"
									style={{
										fontSize: responsiveFontSize(2),
									}}
								>
									Resend
								</Text>
							</TouchableOpacity>
						) : (
							<Text
								className=" text-gray-500 font-bold"
								style={{
									fontSize: responsiveFontSize(2),
								}}
							>
								Resending in {count} seconds
							</Text>
						)}
					</View>
				</View>
			</KeyboardingAvoidWrapper>
		</SafeAreaWrapper>
	);
}
