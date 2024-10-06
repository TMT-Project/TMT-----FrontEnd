import { View, Text } from "react-native";
import React, { useState } from "react";
// import { BASE_URL } from "@env";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link, router } from "expo-router";
import KeyboardingAvoidWrapper from "../../components/KeyboardingAvoidWrapper";
import InputField from "../../components/InputField";
import { Picker } from "@react-native-picker/picker";
import CustomButton from "../../components/CustomButton";

export default function ResetPassword() {
  const [userData, setUserData] = useState({
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    password: "",
    confirmPassword: "",
  });

  const validateForm = () => {
    let newErrors = {};

    if (!userData.password.trim()) {
      newErrors.password = "Password is required";
    } else if (userData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    } else if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[0-9])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
        userData.password
      )
    ) {
      newErrors.password =
        "Password must contain atleast 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character";
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
      // const response = await fetch(`${url}/auth/register`, {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify(data),
      // });

      // if (response.ok) {
      //   console.log("User created successfully", response);
      //   router.push("/(auth)/Otp");
      // } else {
      //   console.log("Failed to create user", response.json());
      //   router.push("/(auth)/SignUp");
      // }
    } catch (error) {
      console.error("Error during Reset Password process:", error);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="w-full mt-5 flex flex-row items-center p-5">
        <Link href="/(auth)/SignUp">
          <Text className="text-lg text-black font-JakartaBold">Back</Text>
        </Link>
      </View>
      <KeyboardingAvoidWrapper>
        <View className="w-full items-center ">
          <Text className="text-3xl font-JakartaBold mb-2">Reset Password</Text>
          <Text className="text-base text-gray-500">
            Enter your new password to reset your account
          </Text>
        </View>

        <View className="px-5 pt-2 mb-10 w-full">
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

          <CustomButton
            title="Sign Up"
            onPress={onResetPress}
            className="mt-4"
            IconLeft=""
            IconRight=""
          />

          {/* Login */}
          <Link
            href="/(auth)/SignIn"
            className="text-lg text-center text-general-200 "
          >
            <Text className="text-base text-center text-gray-500">
              Already have an account?
            </Text>
            <Text className="text-base text-primary-500"> Login</Text>
          </Link>
        </View>
        <Link
          href="/(auth)/ForgotPassword"
          className="text-lg text-center text-general-200 "
        >
          <Text className="text-base text-primary-500"> Login</Text>
        </Link>
      </KeyboardingAvoidWrapper>
    </SafeAreaView>
  );
}
