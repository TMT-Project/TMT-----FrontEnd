import { View, Text, TouchableOpacity } from "react-native";
import React, { useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import {
	responsiveFontSize,
	responsiveWidth,
} from "react-native-responsive-dimensions";

type RadioButtonsProps = {
	currentOption: string;
	setOption: Function;
	options: string[];
	containerStyle?: string;
	buttonStyle?: string;
	textStyle?: string;
	initialValue?: string;
	onChanged?: (value: string) => void;
};

export default function RadioButtons({
	currentOption,
	setOption,
	options,
	containerStyle,
	buttonStyle,
	textStyle,
	initialValue,
	onChanged,
}: RadioButtonsProps) {
	useEffect(() => {
		if (initialValue) {
			setOption(initialValue);
		}
	}, []);

	useEffect(() => {
		onChanged && currentOption && onChanged(currentOption);
	}, [currentOption]);

	return (
		<View
			className={containerStyle}
			style={{
				columnGap: responsiveWidth(3),
			}}
		>
			{options.map((option) => (
				<TouchableOpacity
					className={buttonStyle}
					key={option}
					onPress={() => {
						setOption(option);
					}}
				>
					{currentOption === option ? (
						<Ionicons name="radio-button-on-sharp" size={24} color="#0286FF" />
					) : (
						<Ionicons name="radio-button-off-sharp" size={24} color="#0286FF" />
					)}
					<Text
						className={textStyle}
						style={{
							fontSize: responsiveFontSize(1.5),
							marginLeft: responsiveWidth(1.5),
						}}
					>
						{option}
					</Text>
				</TouchableOpacity>
			))}
		</View>
	);
}
