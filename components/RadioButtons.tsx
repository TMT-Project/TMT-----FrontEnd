import { View, Text, TouchableOpacity } from "react-native";
import React, { useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";

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
		<View className={containerStyle}>
			{options.map((option) => (
				<TouchableOpacity
					className={buttonStyle}
					key={option}
					onPress={() => {
						setOption(option);
					}}
				>
					{currentOption === option ? (
						<Ionicons name="radio-button-on-sharp" size={24} color="black" />
					) : (
						<Ionicons name="radio-button-off-sharp" size={24} color="black" />
					)}
					<Text className={textStyle}>{option}</Text>
				</TouchableOpacity>
			))}
		</View>
	);
}
