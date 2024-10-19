import { View, Text, TextInput, Platform } from "react-native";
import { InputFieldProps } from "../types/type";
import {
	responsiveFontSize,
	responsiveWidth,
} from "react-native-responsive-dimensions";

const InputField = ({
	label,
	labelStyle,
	RightIcon,
	LeftIcon,
	secureTextEntry = false,
	inputContainerStyle,
	containerStyle,
	required,
	inputStyle,
	iconStyle,
	errors,
	placeholder,
	value,
	keyBoardType = Platform.OS == "android" ? "default" : "ascii-capable",
	...props
}: InputFieldProps) => {
	return (
		<View
			className={"w-full " + containerStyle}
			style={{
				marginVertical: responsiveWidth(1.5),
			}}
		>
			{label && (
				<Text
					className={labelStyle}
					style={{
						fontSize: responsiveFontSize(2),
						marginVertical: responsiveWidth(1.5),
					}}
				>
					{label}
				</Text>
			)}
			<View
				className={`flex flex-row justify-start items-center relative bg-neutral-100 border border-neutral-300 focus:border-primary-500 rounded-3xl ${inputContainerStyle}`}
			>
				{LeftIcon && (
					<View
						style={{
							marginLeft: responsiveWidth(5),
						}}
					>
						<LeftIcon />
					</View>
				)}
				<TextInput
					className={`rounded-lg flex-1 text-left ${inputStyle}`}
					secureTextEntry={secureTextEntry}
					placeholder={placeholder}
					value={value}
					{...props}
					style={{
						paddingVertical: responsiveWidth(3),
						paddingHorizontal: responsiveWidth(5),
						fontSize: responsiveFontSize(2),
					}}
					keyboardType={keyBoardType}
				/>
				{RightIcon && (
					<View
						style={{
							marginRight: responsiveWidth(5),
						}}
					>
						<RightIcon />
					</View>
				)}
			</View>
			{errors && <Text className=" text-base text-red-500 ">{errors}</Text>}
		</View>
	);
};

export default InputField;
