import { View, Text, Alert } from "react-native";
import { Link, router } from "expo-router";
import InputField from "../../components/InputField";
import CustomButton from "../../components/CustomButton";
import { useState } from "react";
// import { BASE_URL } from "@env";
import { FormErrors } from "@/types/type";
import SafeAreaWrapper from "@/components/SafeAreaWrapper";
import {
	responsiveFontSize,
	responsiveWidth,
} from "react-native-responsive-dimensions";
import { FontAwesome6, Fontisto } from "@expo/vector-icons";

export default function ForgotPassword() {
	const BASE_URL = process.env.EXPO_PUBLIC_BASE_URL;
	const [userData, setUserData] = useState({
		email: "",
	});
	const [errors, setErrors] = useState<FormErrors>({
		email: "",
	});

	const validateForm = () => {
		let newErrors: FormErrors = {};

		if (!userData.email.trim()) {
			newErrors.email = "Email is required";
		} else if (!/^\S+@\S+\.\S+$/.test(userData.email)) {
			newErrors.email = "Invalid email format";
		}

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const onSubmit = async () => {
		try {
			console.log(userData);

			const data = {
				email: userData.email,
			};

			console.log(data);

			if (!validateForm()) {
				console.log(errors);
				console.log("form not valid");
				Alert.alert("Form not valid");
				return;
			}

			router.push("/(auth)/ForgotOtp");

			const response = await fetch(
				`${BASE_URL}/auth/forgotPassword?email=${data.email}`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
				},
			);

			if (response.ok) {
				console.log("opt send successfully!!");
				router.push({
					pathname: "/(auth)/ForgotOtp",
					params: { email: data.email },
				});
			} else {
				console.log("Failed to send otp");
				router.push("/(auth)/ForgotPassword");
			}
		} catch (error) {
			console.log(error);
		}
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

			<View
				className="w-full items-center"
				style={{
					marginBottom: responsiveWidth(5),
				}}
			>
				<Text
					style={{
						fontSize: responsiveFontSize(3),
						marginBottom: responsiveWidth(2),
					}}
					className="text-primary-500 font-bold"
				>
					Forget Password
				</Text>
				<Text
					className="text-gray-500"
					style={{
						fontSize: responsiveFontSize(1.8),
					}}
				>
					Enter your email below to receive reset code
				</Text>
			</View>

			<View
				className="w-full  flex justify-center items-center"
				style={{
					paddingHorizontal: responsiveWidth(3),
				}}
			>
				<InputField
					label="Email"
					placeholder="Enter your email"
					value={userData.email}
					onChangeText={(value) => setUserData({ ...userData, email: value })}
					errors={errors.email}
					LeftIcon={(style: any) => (
						<Fontisto name="email" size={24} color="#0286ff" />
					)}
				/>

				<View
					style={{
						marginTop: responsiveWidth(5),
					}}
				>
					<CustomButton
						title="Verify"
						onPress={onSubmit}
						width={responsiveWidth(95)}
						disabled={userData.email === ""}
						bgVariant={userData.email === "" ? "secondary" : "default"}
					/>
				</View>

				{/* Sign in */}
				<Link
					href="/(auth)/SignUp"
					className="text-center text-general-200"
					style={{
						marginTop: responsiveWidth(2.5),
						marginBottom: responsiveWidth(5),
					}}
				>
					<Text
						className="text-center text-gray-500"
						style={{
							fontSize: responsiveFontSize(1.8),
						}}
					>
						Don't have an account?
					</Text>
					<Text
						className="text-primary-500 font-bold"
						style={{
							fontSize: responsiveFontSize(1.8),
						}}
					>
						{" "}
						SignUp
					</Text>
				</Link>
			</View>
			<View className="w-full items-center"></View>
		</SafeAreaWrapper>
	);
}
