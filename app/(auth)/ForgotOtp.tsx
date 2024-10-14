import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import React, { useState, useRef, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link, router, useLocalSearchParams } from "expo-router";
import KeyboardingAvoidWrapper from "../../components/KeyboardingAvoidWrapper";
import CustomButton from "../../components/CustomButton";
// import { BASE_URL } from "@env";

export default function ForgotOtp() {
	const BASE_URL = process.env.EXPO_PUBLIC_BASE_URL;

	const [count, setCount] = useState(10);

	const { email } = useLocalSearchParams();

	const otp1 = useRef(null);
	const otp2 = useRef(null);
	const otp3 = useRef(null);
	const otp4 = useRef(null);

	const [otp, setOtp] = useState({
		otp1: "",
		otp2: "",
		otp3: "",
		otp4: "",
	});

	const [errors, setErrors] = useState();

	const validateForm = () => {
		if (otp.otp1 == "" || otp.otp2 == "" || otp.otp3 == "" || otp.otp4 == "") {
			setErrors("otp not valid");
			console.log("otp not valid");
			return false;
		}
		return true;
	};

	const onVerifyPress = async () => {
		console.log(otp);

		if (!validateForm()) {
			console.log("otp not valid");
			Alert.alert("otp not valid");
			return;
		}

		let enteredOtp = otp.otp1 + otp.otp2 + otp.otp3 + otp.otp4;

		console.log("entered otp: " + enteredOtp);

		router.push("/(auth)/ResetPassword");

		const response = await fetch(
			`${BASE_URL}/auth/verify?otp=${enteredOtp}&email=${email}`,
		);

		if (response.ok) {
			console.log("otp valid");
			router.push("/(auth)/ResetPassword");
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

	return (
		<SafeAreaView className="flex-1 bg-white">
			<View className="w-full mt-5 flex flex-row items-center p-5">
				<Link href="/(auth)/SignUp">
					<Text className="text-lg text-black font-JakartaBold">Back</Text>
				</Link>
			</View>
			<KeyboardingAvoidWrapper>
				<View className="w-full items-center mt-16 ">
					<Text className="text-3xl font-JakartaBold tracking-widest mb-2">
						Enter Verification Code
					</Text>
					<Text className="text-base text-gray-500">
						We have sent to your inbox
					</Text>
				</View>
				<View className="px-5 pt-2 my-10 w-full flex flex-col justify-center items-center">
					{/* OTPInputView */}
					<View className="w-full flex flex-row justify-center items-center">
						<TextInput
							ref={otp1}
							keyboardType="numeric"
							maxLength={1}
							className={`p-2 text-xl border border-neutral-300 rounded-xl text-center w-[52px] h-[52px] mr-5 ${"focus:border-primary-500"}`}
							onChangeText={(txt) => {
								setOtp({ ...otp, otp1: txt });
								if (txt.length >= 1) {
									otp2.current.focus();
								} else if (txt.length < 1) {
									otp1.current.focus();
								}
							}}
						/>
						<TextInput
							ref={otp2}
							keyboardType="numeric"
							maxLength={1}
							className={`p-2 text-xl border border-neutral-300 rounded-xl text-center w-[52px] h-[52px] mr-5 ${"focus:border-primary-500"}`}
							onChangeText={(txt) => {
								setOtp({ ...otp, otp2: txt });
								if (txt.length >= 1) {
									otp3.current.focus();
								} else if (txt.length < 1) {
									otp1.current.focus();
								}
							}}
						/>
						<TextInput
							ref={otp3}
							keyboardType="numeric"
							maxLength={1}
							className={`p-2 text-xl border border-neutral-300 rounded-xl text-center w-[52px] h-[52px] mr-5 ${"focus:border-primary-500"}`}
							onChangeText={(txt) => {
								setOtp({ ...otp, otp3: txt });
								if (txt.length >= 1) {
									otp4.current.focus();
								} else if (txt.length < 1) {
									otp2.current.focus();
								}
							}}
						/>
						<TextInput
							ref={otp4}
							keyboardType="numeric"
							maxLength={1}
							className={`p-2 text-xl border border-neutral-300 rounded-xl text-center w-[52px] h-[52px] mr-5 ${"focus:border-primary-500"}`}
							onChangeText={(txt) => {
								setOtp({ ...otp, otp4: txt });
								if (txt.length >= 1) {
									otp4.current.focus();
								} else if (txt.length < 1) {
									otp3.current.focus();
								}
							}}
						/>
					</View>

					{/* Buttons */}
					<View className="w-full flex flex-col justify-center items-center">
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
							className={`mt-5`}
							IconLeft=""
							IconRight=""
							disabled={
								otp.otp1 !== "" &&
								otp.otp2 !== "" &&
								otp.otp3 !== "" &&
								otp.otp4 !== ""
									? false
									: true
							}
						/>
					</View>

					{/* Timer */}
					<View className="w-full mt-3 flex flex-row justify-center items-center">
						{count === 0 ? (
							<TouchableOpacity
								className="w-full flex justify-center items-center"
								onPress={onResend}
							>
								<Text className="text-lg text-[#0286ff] font-bold">Resend</Text>
							</TouchableOpacity>
						) : (
							<Text className="text-base text-gray-500">
								Resending in {count} seconds
							</Text>
						)}
					</View>
				</View>
			</KeyboardingAvoidWrapper>
		</SafeAreaView>
	);
}
