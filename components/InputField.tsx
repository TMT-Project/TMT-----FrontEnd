import { View, Text, Image, TextInput } from "react-native";
import React from "react";
import { InputFieldProps } from "../types/type";

const InputField = ({
	label,
	labelStyle,
	icon,
	secureTextEntry = false,
	inputContainerStyle,
	containerStyle,
	required,
	inputStyle,
	iconStyle,
	errors,
	placeholder,
	value,
	...props
}: InputFieldProps) => {
	return (
		<View className={"w-full my-1 " + containerStyle}>
			{label && (
				<Text className={`text-lg font-JakartaSemiBold mb-2 ${labelStyle}`}>
					{label}
				</Text>
			)}
			<View
				className={`flex flex-row justify-start items-center relative bg-neutral-100 border border-neutral-300 focus:border-primary-500 rounded-3xl ${inputContainerStyle}`}
			>
				{icon && (
					<Image source={icon} className={`w-6 h-6 ml-4 ${iconStyle}`} />
				)}
				<TextInput
					className={`rounded-lg p-3 font-JakartaSemiBold text-[14px] flex-1 text-left ${inputStyle}`}
					secureTextEntry={secureTextEntry}
					// required={required}
					placeholder={placeholder}
					value={value}
					{...props}
				/>
			</View>
			{errors && (
				<Text className="text-red-500 text-base font-JakartaSemiBold">
					{errors}
				</Text>
			)}
		</View>
	);
};

export default InputField;
