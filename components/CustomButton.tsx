import { Text, TouchableOpacity, ButtonProps } from "react-native";
import React from "react";
import {
	responsiveHeight,
	responsiveWidth,
	responsiveFontSize,
} from "react-native-responsive-dimensions";

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
	className?: string;
	disabled?: boolean;
	IconLeft?: React.FC | undefined;
	IconRight?: React.FC | undefined;
	onPress: () => void;
	title: string;
	width?: number;
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
	width = responsiveWidth(85),
	...props
}: CustomButtonProps) => {
	return (
		<TouchableOpacity
			activeOpacity={0.5}
			onPress={onPress}
			disabled={disabled}
			className={` rounded-full flex flex-row justify-center items-end box-shadow-md shadow-neutral-400/70 ${getBgVariantStyle(
				bgVariant,
			)}  ${className}`}
			{...props}
			style={{
				width: width,
				// margin: responsiveWidth(7),
				padding: responsiveHeight(1.3),
			}}
		>
			{IconLeft && <IconLeft />}
			<Text
				className={`font-bold ${getTextVariantStyle(textVariant)} `}
				style={{ fontSize: responsiveFontSize(2.5), marginHorizontal: 10 }}
			>
				{title}
			</Text>
			{IconRight && <IconRight />}
		</TouchableOpacity>
	);
};

export default CustomButton;
