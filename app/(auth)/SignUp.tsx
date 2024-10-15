import { View, Text, SafeAreaView, Alert } from "react-native";
import { Picker } from "@react-native-picker/picker";
import React, { useEffect, useState } from "react";
import { Link, router } from "expo-router";
import InputField from "../../components/InputField";
import CustomButton from "../../components/CustomButton";
import KeyboardingAvoidWrapper from "../../components/KeyboardingAvoidWrapper";
// import { BASE_URL } from "@env";
import { FormErrors } from "@/types/type";

export default function SignUp() {
	const BASE_URL = process.env.EXPO_PUBLIC_BASE_URL;
	const [countries, setCountries] = useState<
		{
			code: string;
			id: number;
			name: string;
		}[]
	>([]);

	const [selectedCountry, setSelectedCountry] = useState("");

	const [userData, setUserData] = useState({
		name: "",
		email: "",
		phone: "",
		password: "",
		confirmPassword: "",
		nationality: "",
	});

	const [errors, setErrors] = useState<FormErrors>({
		name: "",
		email: "",
		phone: "",
		password: "",
		confirmPassword: "",
		nationality: "",
	});

	useEffect(() => {
		const fetchCountries = async () => {
			try {
				const response = await fetch(`${BASE_URL}/tmt/countries`);
				const data = await response.json();
				setCountries(data);
				console.log("countries", countries);
			} catch (error) {
				console.error("Error fetching countries:", error);
			}
		};
		fetchCountries();
	}, []);

	const validateForm = () => {
		let newErrors: FormErrors = {};

		if (!userData.name.trim()) {
			newErrors.name = "Name is required";
		} else if (userData.name.length < 3) {
			newErrors.name = "Name must be at least 3 characters";
		}

		if (!userData.email.trim()) {
			newErrors.email = "Email is required";
		} else if (!/^\S+@\S+\.\S+$/.test(userData.email)) {
			newErrors.email = "Invalid email format";
		}

		if (!userData.phone.trim()) {
			newErrors.phone = "Phone Number is required";
		} else if (userData.phone.length !== 10) {
			newErrors.phone = "Phone Number must be 10 characters";
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

		if (
			userData.password !== userData.confirmPassword ||
			!userData.confirmPassword
		) {
			newErrors.confirmPassword = "Passwords do not match";
		}

		if (!userData.nationality.trim()) {
			newErrors.nationality = "Select a country";
		}

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const onSignUpPress = async () => {
		try {
			console.log(userData);

			const data = {
				fullname: userData.name,
				email: userData.email,
				password: userData.password,
				mobileNo: userData.phone,
				nationality: selectedCountry,
			};

			console.log(data);

			if (!validateForm()) {
				console.log(errors);
				console.log("form not valid");
				return;
			}

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
				router.push({
					pathname: "/(auth)/Otp",
					params: { email: data.email },
				});
			} else {
				console.log("Failed to create user", response.json());
				router.push("/(auth)/SignUp");
			}
		} catch (error) {
			console.error("Error during sign-up process:", error);
		}
	};

	return (
		<SafeAreaView className="flex-1 bg-white">
			<View className="w-full mt-5 flex flex-row items-center p-5">
				<Link href="/(auth)/Initial">
					<Text className="text-lg text-black font-JakartaBold">Back</Text>
				</Link>
			</View>
			<KeyboardingAvoidWrapper>
				<View className="w-full items-center ">
					<Text className="text-3xl font-JakartaBold mb-2">Sign Up</Text>
					<Text className="text-base text-gray-500">
						Create an account to start your journey
					</Text>
				</View>

				<View className="px-5 pt-2 mb-10 w-full">
					<InputField
						label="Name"
						required={true}
						placeholder="Enter your name"
						value={userData.name}
						onChangeText={(value) => setUserData({ ...userData, name: value })}
						errors={errors.name}
					/>
					<InputField
						label="Email"
						placeholder="Enter your email"
						value={userData.email}
						onChangeText={(value) => setUserData({ ...userData, email: value })}
						errors={errors.email}
					/>
					<InputField
						label="Phone Number"
						placeholder="Enter your phone number"
						value={userData.phone}
						onChangeText={(value) => setUserData({ ...userData, phone: value })}
						errors={errors.phone}
					/>
					<InputField
						label="Password"
						placeholder="Enter your password"
						secureTextEntry
						value={userData.password}
						onChangeText={(value) =>
							setUserData({ ...userData, password: value })
						}
						errors={errors.password}
					/>
					<InputField
						label="Confirm Password"
						placeholder="Confirm your password"
						secureTextEntry
						value={userData.confirmPassword}
						onChangeText={(value) =>
							setUserData({ ...userData, confirmPassword: value })
						}
						errors={errors.confirmPassword}
					/>

					<View>
						<Text className={`text-lg font-JakartaSemiBold mb-2`}>Country</Text>
					</View>

					<View className="border border-neutral-300 bg-neutral-100 focus:border-primary-500  rounded-full">
						<Picker
							className="w-full"
							selectedValue={selectedCountry}
							onValueChange={(value) => {
								setSelectedCountry(value);
								console.log(value);
							}}
						>
							<Picker.Item label="-- Select Country --" value="" />
							{countries.map((con, index) => (
								<Picker.Item
									key={index}
									label={con.name + " - " + con.code}
									value={con.name}
								/>
							))}
						</Picker>
					</View>
					{errors.nationality && (
						<Text className="text-red-500">{errors.nationality}</Text>
					)}

					<CustomButton
						title="Sign Up"
						onPress={onSignUpPress}
						className="mt-4"
					/>

					{/* Login */}
					<Link
						href="/(auth)/SignIn"
						className="text-lg text-center text-general-200 mt-3"
					>
						<Text className="text-base text-center text-gray-500">
							Already have an account?
						</Text>
						<Text className="text-base text-primary-500"> Login</Text>
					</Link>
				</View>
				{/* <Link href="/Otp" className="text-lg text-center text-general-200 ">
					<Text className="text-base text-primary-500"> Login</Text>
				</Link> */}
			</KeyboardingAvoidWrapper>
		</SafeAreaView>
	);
}
