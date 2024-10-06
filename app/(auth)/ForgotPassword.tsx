import { View, Text, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link, router, useLocalSearchParams } from "expo-router";
import InputField from "../../components/InputField";
import CustomButton from "../../components/CustomButton";
import { useState } from "react";
// import { BASE_URL } from "@env";

export default function ForgotPassword() {
  const [userData, setUserData] = useState({
    email: "",
  });
  const [errors, setErrors] = useState({
    email: "",
  });

  const validateForm = () => {
    let newErrors = {};

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

      // const response = await fetch(
      //   `${BASE_URL}/auth/forgotPassword?email=${data.email}`,
      //   {
      //     method: "POST",
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //   }
      // );

      // if (response.ok) {
      //   console.log("opt send successfully!!");
      //   router.push({
      //     pathname: "/(auth)/ForgotOtp",
      //     params: { email: data.email },
      //   });
      // } else {
      //   console.log("Failed to send otp");
      //   router.push("/(auth)/ForgotPassword");
      // }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="w-full mt-5 flex flex-row items-center p-5">
        <Link href="/(auth)/SignUp">
          <Text className="text-lg text-black font-JakartaBold">Back</Text>
        </Link>
      </View>
      <View className="w-full items-center ">
        <Text className="text-3xl font-JakartaBold mb-2">Forget Password</Text>
        <Text className="text-base text-gray-500">
          Enter your email below to receive reset code
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

        <CustomButton
          title="Continue"
          onPress={onSubmit}
          disabled={false}
          className="mt-4"
          IconLeft=""
          IconRight=""
        />

        {/* Sign in */}
        <Link
          href="/(auth)/SignIn"
          className="text-lg text-center text-general-200 "
        >
          <Text className="text-base text-center text-gray-500">
            Have an account{" "}
          </Text>
          <Text className="text-base text-primary-500">Sign in</Text>
        </Link>
      </View>
      <View className="w-full items-center"></View>
    </SafeAreaView>
  );
}
