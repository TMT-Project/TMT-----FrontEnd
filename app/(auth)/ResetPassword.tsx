import { View, Text } from "react-native";
import { useState } from "react";
import { Link, router } from "expo-router";
import KeyboardingAvoidWrapper from "../../components/KeyboardingAvoidWrapper";
import InputField from "../../components/InputField";
import CustomButton from "../../components/CustomButton";
import { FormErrors } from "@/types/type";
import SafeAreaWrapper from "@/components/SafeAreaWrapper";
import {
	responsiveFontSize,
	responsiveWidth,
} from "react-native-responsive-dimensions";
import { Feather, FontAwesome6, MaterialIcons } from "@expo/vector-icons";

export default function ResetPassword() {
	const BASE_URL = process.env.EXPO_PUBLIC_BASE_URL;
	const [userData, setUserData] = useState({
		password: "",
		confirmPassword: "",
	});

	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);

	const [errors, setErrors] = useState<FormErrors>({
		password: "",
		confirmPassword: "",
	});

	const validateForm = () => {
		let newErrors: FormErrors = {};

		if (!userData.password.trim()) {
			newErrors.password = "Password is required";
		} else if (userData.password.length < 8) {
			newErrors.password = "Password must be at least 8 characters";
		} else if (
			!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[0-9])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
				userData.password,
			)
		) {
			newErrors.password =
				"Password must contain at least 1 upper-case letter, 1 lower-case letter, 1 number, and 1 special character";
		}

		if (userData.password !== userData.confirmPassword) {
			newErrors.confirmPassword = "Passwords do not match";
		}

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const onResetPress = async () => {
		try {
			console.log(userData);

			const data = {
				password: userData.password,
				confirmPassword: userData.confirmPassword,
			};

			console.log(data);

			if (!validateForm()) {
				console.log(errors);
				console.log("form not valid");
				return;
			}

			router.push("/(auth)/Otp");

			// API call
			const response = await fetch(`${BASE_URL}/auth/register`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(data),
			});

			if (response.ok) {
				console.log("User created successfully", response);
				router.push("/(auth)/Otp");
			} else {
				console.log("Failed to create user", response.json());
				router.push("/(auth)/SignUp");
			}
		} catch (error) {
			console.error("Error during Reset Password process:", error);
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
			<KeyboardingAvoidWrapper>
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
						Reset Password
					</Text>
					<Text
						className="text-gray-500"
						style={{
							fontSize: responsiveFontSize(1.8),
						}}
					>
						Enter your new password to reset your account
					</Text>
				</View>

				<View
					className="w-full  flex justify-center items-center"
					style={{
						paddingHorizontal: responsiveWidth(3),
					}}
				>
					<InputField
						label="Password"
						placeholder="Enter your password"
						secureTextEntry={showPassword}
						value={userData.password}
						onChangeText={(value) =>
							setUserData({ ...userData, password: value })
						}
						errors={errors.password}
						LeftIcon={(style: any) => (
							<MaterialIcons name="lock-outline" size={24} color="#0286ff" />
						)}
						RightIcon={(style: any) => (
							<Feather
								name={showPassword ? "eye-off" : "eye"}
								size={24}
								color="black"
								onPress={() => setShowPassword(!showPassword)}
							/>
						)}
					/>
					<InputField
						label="Confirm Password"
						placeholder="Confirm your password"
						secureTextEntry={showConfirmPassword}
						value={userData.confirmPassword}
						onChangeText={(value) =>
							setUserData({ ...userData, confirmPassword: value })
						}
						errors={errors.confirmPassword}
						LeftIcon={(style: any) => (
							<MaterialIcons name="lock-outline" size={24} color="#0286ff" />
						)}
						RightIcon={(style: any) => (
							<Feather
								name={showPassword ? "eye-off" : "eye"}
								size={24}
								color="black"
								onPress={() => setShowConfirmPassword(!showConfirmPassword)}
							/>
						)}
					/>

					<View
						style={{
							marginTop: responsiveWidth(5),
						}}
					>
						<CustomButton
							title="Verify"
							onPress={onResetPress}
							width={responsiveWidth(95)}
							disabled={
								userData.password === "" || userData.confirmPassword === ""
							}
							bgVariant={
								userData.password === "" || userData.confirmPassword === ""
									? "secondary"
									: "default"
							}
						/>
					</View>

					{/* Login */}
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
				{/* <Link
					href="/(auth)/ForgotPassword"
					className="text-lg text-center text-general-200 "
				>
					<Text className="text-base text-primary-500"> Login</Text>
				</Link> */}
			</KeyboardingAvoidWrapper>
		</SafeAreaWrapper>
	);
}
