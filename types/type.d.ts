import { KeyboardTypeOptions, TextInputProps, TouchableOpacityProps } from "react-native";

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
	RightIcon?: React.FC | undefined;
	LeftIcon?: React.FC | undefined;
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
	keyBoardType?: KeyboardTypeOptions ;
}

type FormErrors = {
	name?: string;
	phone?: string;
	email?: string;
	password?: string;
	confirmPassword?: string;
	nationality?: string;
};
