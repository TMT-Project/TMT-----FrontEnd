import { View, Text, Platform } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useEffect, useState } from "react";
import { Link, router } from "expo-router";
import InputField from "../../components/InputField";
import CustomButton from "../../components/CustomButton";
import KeyboardingAvoidWrapper from "../../components/KeyboardingAvoidWrapper";
// import { BASE_URL } from "@env";
import { FormErrors } from "@/types/type";
import {
	AntDesign,
	Feather,
	FontAwesome6,
	Fontisto,
	MaterialIcons,
} from "@expo/vector-icons";
import {
	responsiveFontSize,
	responsiveWidth,
} from "react-native-responsive-dimensions";
import SafeAreaWrapper from "@/components/SafeAreaWrapper";

export default function SignUp() {
	const BASE_URL = process.env.EXPO_PUBLIC_BASE_URL;
	console.log(BASE_URL);

	const [countries, setCountries] = useState<
		{
			code: string;
			id: number;
			name: string;
		}[]
	>([]);

	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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
				// const response = await fetch(
				// 	`http://88.222.212.112:8080/tmt/countries`,
				// );
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
					>
						Sign Up
					</Text>
					<Text
						className="text-gray-500"
						style={{
							fontSize: responsiveFontSize(1.8),
						}}
					>
						Create an account to start your journey
					</Text>
				</View>

				<View
					className="w-full  flex justify-center items-center"
					style={{
						paddingHorizontal: responsiveWidth(3),
					}}
				>
					<InputField
						label="Name"
						required={true}
						placeholder="Enter your name"
						value={userData.name}
						onChangeText={(value) => setUserData({ ...userData, name: value })}
						errors={errors.name}
						LeftIcon={(style: any) => (
							<AntDesign name="user" size={24} color="black" style={style} />
						)}
					/>
					<InputField
						label="Email"
						placeholder="Enter your email"
						value={userData.email}
						onChangeText={(value) => setUserData({ ...userData, email: value })}
						errors={errors.email}
						LeftIcon={(style: any) => (
							<Fontisto name="email" size={24} color="black" />
						)}
					/>
					<InputField
						label="Phone Number"
						placeholder="Enter your phone number"
						value={userData.phone}
						onChangeText={(value) => setUserData({ ...userData, phone: value })}
						errors={errors.phone}
						LeftIcon={(style: any) => (
							<Feather name="phone" size={24} color="black" />
						)}
						keyBoardType={
							Platform.OS === "android" ? "phone-pad" : "name-phone-pad"
						}
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
							<MaterialIcons name="lock-outline" size={24} color="black" />
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
							<MaterialIcons name="lock-outline" size={24} color="black" />
						)}
						RightIcon={(style: any) => (
							<Feather
								name={showConfirmPassword ? "eye-off" : "eye"}
								size={24}
								color="black"
								onPress={() => setShowConfirmPassword(!showConfirmPassword)}
							/>
						)}
					/>
					<View className="w-full">
						<View>
							<Text
								style={{
									fontSize: responsiveFontSize(2),
									marginVertical: responsiveWidth(1.5),
								}}
							>
								Country
							</Text>
						</View>
						{/* TODO: Add Flag Icon */}
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
					</View>

					<View
						style={{
							marginTop: responsiveWidth(5),
						}}
					>
						<CustomButton
							title="Sign Up"
							onPress={onSignUpPress}
							width={responsiveWidth(95)}
							disabled={
								userData.name === "" ||
								userData.email === "" ||
								userData.phone === "" ||
								userData.password === "" ||
								userData.confirmPassword === "" ||
								selectedCountry === ""
							}
							bgVariant={
								userData.name === "" ||
								userData.email === "" ||
								userData.phone === "" ||
								userData.password === "" ||
								userData.confirmPassword === "" ||
								selectedCountry === ""
									? "secondary"
									: "default"
							}
						/>
					</View>
				</View>
				<Link
					href="/(auth)/SignIn"
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
						Already have an account?
					</Text>
					<Text
						className="text-primary font-bold"
						style={{
							fontSize: responsiveFontSize(1.8),
						}}
					>
						{" "}
						Login
					</Text>
				</Link>
			</KeyboardingAvoidWrapper>
			{/* <Link href="/Otp" className="text-lg text-center text-general-200 ">
					<Text className="text-base text-primary-500"> Login</Text>
				</Link> */}
		</SafeAreaWrapper>
	);
}
