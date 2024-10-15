import { TextInputProps, TouchableOpacityProps } from "react-native";

declare interface ButtonProps extends TouchableOpacityProps {
	title: string;
	bgVariant?: "primary" | "secondary" | "danger" | "outline" | "success";
	textVariant?: "primary" | "default" | "secondary" | "danger" | "success";
	IconLeft?: React.ComponentType<any>;
	IconRight?: React.ComponentType<any>;
	className?: string;
}

declare interface InputFieldProps extends TextInputProps {
	label?: string;
	icon?: any;
	secureTextEntry?: boolean;
	labelStyle?: string;
	inputContainerStyle?: string;
	containerStyle?: string;
	inputStyle?: string;
	iconStyle?: string;
	className?: string;
	required?: boolean;
	errors?: any;
	placeholder?: string;
}

type FormErrors = {
	name?: string;
	phone?: string;
	email?: string;
	password?: string;
	confirmPassword?: string;
	nationality?: string;
};
