import { View, Text, TouchableOpacity } from "react-native";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { responsiveFontSize } from "react-native-responsive-dimensions";

export default function TabBar({
	state,
	descriptors,
	navigation,
}: BottomTabBarProps) {
	const icons: { [key: string]: (props?: any) => React.JSX.Element } = {
		Home: (props: any) => (
			<AntDesign name="home" size={24} color="white" {...props} />
		),
		Search: (props: any) => (
			<MaterialIcons name="flight" size={24} color="white" {...props} />
		),
		Register: (props: any) => (
			<AntDesign name="pluscircle" size={24} color="white" {...props} />
		),
		History: (props: any) => (
			<MaterialIcons name="history" size={24} color="white" {...props} />
		),
		Profile: (props: any) => (
			<AntDesign name="user" size={24} color="white" {...props} />
		),
	};
	return (
		<View
			className="flex flex-row justify-center items-center px-4 pb-1"
			style={{}}
		>
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
						key={route.name}
						accessibilityRole="button"
						accessibilityState={isFocused ? { selected: true } : {}}
						accessibilityLabel={options.tabBarAccessibilityLabel}
						testID={options.tabBarTestID}
						onPress={onPress}
						onLongPress={onLongPress}
						className={
							"flex-1 flex flex-col items-center justify-center transition-all ease-in-out delay-200" +
							(isFocused ? " bg-[#0286ff] py-1 rounded-full" : "")
						}
					>
						{icons[route.name]({
							size: isFocused ? 30 : 24,
							color: isFocused ? "white" : "black",
						}) || null}
						<Text
							className="text-center text-base text-black"
							style={{
								color: isFocused ? "white" : "black",
								fontSize: responsiveFontSize(1.5),
							}}
						>
							{typeof label === "string" ? label : ""}
						</Text>
					</TouchableOpacity>
				);
			})}
		</View>
	);
}
