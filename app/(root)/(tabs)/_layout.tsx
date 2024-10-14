import { Stack } from "expo-router";
import React from "react";
import { Tabs } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function Layout() {
	return (
		<Tabs>
			<Tabs.Screen
				name="Home"
				options={{
					title: "Home",
					headerShown: false,
				}}
			/>
			<Tabs.Screen
				name="Search"
				options={{ title: "Search flights", headerShown: false }}
			/>
			<Tabs.Screen
				name="Register"
				options={{ title: "Register", headerShown: false }}
			/>
			<Tabs.Screen
				name="History"
				options={{ title: "History", headerShown: false }}
			/>
			<Tabs.Screen
				name="Profile"
				options={{ title: "Profile", headerShown: false }}
			/>
		</Tabs>
	);
}
