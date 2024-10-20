import { View, Text } from "react-native";
import { useState } from "react";
import { Link, router } from "expo-router";
import InputField from "../../components/InputField";
import CustomButton from "../../components/CustomButton";
// import { BASE_URL } from "@env";
import { FormErrors } from "@/types/type";
import SafeAreaWrapper from "@/components/SafeAreaWrapper";
import {
	responsiveFontSize,
	responsiveWidth,
} from "react-native-responsive-dimensions";
import {
	Feather,
	FontAwesome6,
	Fontisto,
	MaterialIcons,
} from "@expo/vector-icons";
import KeyboardingAvoidWrapper from "@/components/KeyboardingAvoidWrapper";

export default function SignIn() {
	const BASE_URL = process.env.EXPO_PUBLIC_BASE_URL;
	const [userData, setUserData] = useState({
		email: "",
		password: "",
	});

	const [errors, setErrors] = useState<FormErrors>({
		email: "",
		password: "",
	});

	const [showPassword, setShowPassword] = useState(false);

	const validateForm = () => {
		let newErrors: FormErrors = {};

		if (!userData.email.trim()) {
			newErrors.email = "Email is required";
		} else if (!/^\S+@\S+\.\S+$/.test(userData.email)) {
			newErrors.email = "Invalid email format";
		}

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
		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const onSignInPress = async () => {
		try {
			console.log(userData);

			const data = {
				email: userData.email,
				password: userData.password,
			};

			console.log(data);

			if (!validateForm()) {
				console.log(errors);
				console.log("form not valid");
				return;
			}

			// API call
			const response = await fetch(`${BASE_URL}/auth/authenticate`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(data),
			});
			const token = await response.json();

			console.log(response);
			console.log("token: " + token.token);

			if (response.ok) {
				console.log("User created successfully", response);
				router.push("/(root)/(tabs)/Home");
			} else {
				console.log("Failed to create user", response.json());
				router.push("/(auth)/SignUp");
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<SafeAreaWrapper>
			<KeyboardingAvoidWrapper>
				<View
					className="w-full flex flex-row items-center"
					style={{
						marginTop: responsiveWidth(1),
						padding: responsiveWidth(5),
					}}
				>
					<Link href="/(auth)/Initial">
						<FontAwesome6 name="arrow-left-long" size={20} color="#737373" />
					</Link>
				</View>
				<View className="w-full items-center ">
					<Text
						style={{
							fontSize: responsiveFontSize(3),
							marginBottom: responsiveWidth(2),
						}}
						className="text-primary-500 font-bold"
					>
						Sign In
					</Text>
					<Text
						className="text-gray-500"
						style={{
							fontSize: responsiveFontSize(1.8),
						}}
					>
						Log in to start your journey
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
					<View
						style={{
							marginTop: responsiveWidth(5),
						}}
					>
						<CustomButton
							title="Sign In"
							onPress={onSignInPress}
							disabled={userData.email === "" || userData.password === ""}
							width={responsiveWidth(95)}
							bgVariant={
								userData.email === "" || userData.password === ""
									? "secondary"
									: "default"
							}
						/>
					</View>

					{/* Sign in */}
					<Link
						href="/(auth)/SignUp"
						className="text-center text-general-200"
						style={{
							marginTop: responsiveWidth(2.5),
							// marginBottom: responsiveWidth(5),
						}}
					>
						<Text
							className="text-center text-gray-500"
							style={{
								fontSize: responsiveFontSize(1.8),
							}}
						>
							Create an account?{" "}
						</Text>
						<Text
							className="text-primary-500 font-bold"
							style={{
								fontSize: responsiveFontSize(1.8),
							}}
						>
							Sign up
						</Text>
					</Link>
					{/* Sign in */}
					<Link
						href="/(auth)/ForgotPassword"
						className="text-center text-general-200"
						style={{
							marginTop: responsiveWidth(2.5),
							marginBottom: responsiveWidth(5),
						}}
					>
						<Text
							className="text-secondary-600 font-bold"
							style={{
								fontSize: responsiveFontSize(1.8),
							}}
						>
							Forget Password
						</Text>
					</Link>
				</View>
			</KeyboardingAvoidWrapper>
		</SafeAreaWrapper>
	);
}
