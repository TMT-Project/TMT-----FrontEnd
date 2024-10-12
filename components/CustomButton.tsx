import { Text, TouchableOpacity, ButtonProps } from "react-native";
import React from "react";

type BgVariantProps =
	| "primary"
	| "secondary"
	| "danger"
	| "outline"
	| "success"
	| "default";

type TextVariantProps =
	| "primary"
	| "danger"
	| "secondary"
	| "success"
	| "default";

type CustomButtonProps = {
	bgVariant?: BgVariantProps;
	textVariant?: TextVariantProps;
	className: string;
	disabled?: boolean;
	IconLeft?: React.FC | undefined;
	IconRight?: React.FC | undefined;
	onPress: () => void;
	title: string;
};

const getBgVariantStyle = (variant: BgVariantProps) => {
	switch (variant) {
		case "secondary":
			return "bg-gray-500";
		case "danger":
			return "bg-red-500";
		case "outline":
			return "bg-transparent border-[0.7px] border-neutral-300";
		case "success":
			return "bg-green-500";
		default:
			return "bg-[#0286ff]";
	}
};

const getTextVariantStyle = (variant: TextVariantProps) => {
	switch (variant) {
		case "primary":
			return "text-black";
		case "danger":
			return "text-red-100";
		case "secondary":
			return "text-gray-100";
		case "success":
			return "text-green-100";
		default:
			return "text-white";
	}
};

const CustomButton = ({
	onPress,
	title,
	bgVariant = "primary",
	textVariant = "default",
	IconLeft = undefined,
	IconRight = undefined,
	disabled = false,
	className,
	...props
}: CustomButtonProps) => {
	return (
		<TouchableOpacity
			activeOpacity={0.5}
			onPress={onPress}
			disabled={disabled}
			className={`w-full mb-3 p-3 rounded-full flex flex-row justify-center items-end shadow-md shadow-neutral-400/70 ${getBgVariantStyle(
				bgVariant,
			)}  ${className}`}
			{...props}
		>
			{IconLeft && <IconLeft />}
			<Text
				className={`text-2xl font-bold mr-3 ${getTextVariantStyle(
					textVariant,
				)} `}
			>
				{title}
			</Text>
			{IconRight && <IconRight />}
		</TouchableOpacity>
	);
};

export default CustomButton;
