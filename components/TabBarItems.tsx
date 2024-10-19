import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";

export default function TabBarItems({
	state,
	descriptors,
	navigation,
	route,
}: BottomTabBarProps & { route: string }) {
	const { options } = descriptors[route.key];
	const label =
		options.tabBarLabel !== undefined
			? options.tabBarLabel
			: options.title !== undefined
			? options.title
			: route.name;

	const isFocused = state.index === index;

	const onPress = () => {
		const event = navigation.emit({
			type: "tabPress",
			target: route.key,
			canPreventDefault: true,
		});

		if (!isFocused && !event.defaultPrevented) {
			navigation.navigate(route.name, route.params);
		}
	};

	const onLongPress = () => {
		navigation.emit({
			type: "tabLongPress",
			target: route.key,
		});
	};

	return (
		<TouchableOpacity
			accessibilityRole="button"
			accessibilityState={isFocused ? { selected: true } : {}}
			accessibilityLabel={options.tabBarAccessibilityLabel}
			testID={options.tabBarTestID}
			onPress={onPress}
			onLongPress={onLongPress}
			className="flex-1 flex flex-col items-center justify-center"
		>
			{icons[route.name] || null}
			<Text className="text-center focus:text-[#673ab7] text-[#222]">
				{typeof label === "string" ? label : ""}
			</Text>
		</TouchableOpacity>
	);
}
