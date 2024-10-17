import { View, Text, TouchableOpacity } from "react-native";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";

export default function TabBar({
	state,
	descriptors,
	navigation,
}: BottomTabBarProps) {
	const icons: { [key: string]: JSX.Element } = {
		Home: <AntDesign name="home" size={24} color="black" />,
		Search: <MaterialIcons name="flight" size={24} color="black" />,
		Register: <AntDesign name="pluscircle" size={24} color="black" />,
		History: <MaterialIcons name="history" size={24} color="black" />,
		Profile: <AntDesign name="user" size={24} color="black" />,
	};
	return (
		<View className="flex flex-row justify-center items-center p-4 bg-green-500">
			{state.routes.map((route, index) => {
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
			})}
		</View>
	);
}
