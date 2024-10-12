import { View, Text, ScrollView, SafeAreaView } from "react-native";
import React, { useState } from "react";
import { Link, router } from "expo-router";
import InputField from "../../components/InputField";
import CustomButton from "../../components/CustomButton";
// import { BASE_URL } from "@env";

export default function SignIn() {
	const BASE_URL = process.env.EXPO_PUBLIC_BASE_URL;
	const [userData, setUserData] = useState({
		email: "",
		password: "",
	});

	const [errors, setErrors] = useState({
		email: "",
		password: "",
	});

	const validateForm = () => {
		let newErrors = {};

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
				"Password must contain atleast 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character";
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
		<SafeAreaView className="flex-1 bg-white">
			<View className="w-full mt-5 flex flex-row items-center p-5">
				<Link href="/(auth)/Welcome">
					<Text className="text-lg text-black font-JakartaBold">Back</Text>
				</Link>
			</View>
			<View className="w-full items-center ">
				<Text className="text-3xl font-JakartaBold mb-2">Sign In</Text>
				<Text className="text-base text-gray-500">
					Log in to start your journey
				</Text>
			</View>
			<View className="px-5 pt-2 w-full">
				<InputField
					label="Email"
					placeholder="Enter your email"
					value={userData.email}
					errors={errors.email}
					onChangeText={(value) => setUserData({ ...userData, email: value })}
				/>
				<InputField
					label="Password"
					placeholder="Enter your password"
					secureTextEntry
					errors={errors.password}
					value={userData.password}
					onChangeText={(value) =>
						setUserData({ ...userData, password: value })
					}
				/>
				<CustomButton
					title="Sign In"
					onPress={onSignInPress}
					disabled={false}
					className="mt-4"
					IconLeft=""
					IconRight=""
				/>

				{/* Sign in */}
				<Link
					href="/(auth)/SignUp"
					className="text-lg text-center text-general-200 "
				>
					<Text className="text-base text-center text-gray-500">
						Create an account{" "}
					</Text>
					<Text className="text-base text-primary-500">Sign in</Text>
				</Link>
				{/* Sign in */}
				<Link
					href="/(auth)/ForgotPassword"
					className="text-lg text-center text-general-200 "
				>
					{/* <Text className="text-base text-center text-gray-500">
            Create an account{" "}
          </Text> */}
					<Text className="text-base text-primary-500">Forget Password</Text>
				</Link>
			</View>
		</SafeAreaView>
	);
}
