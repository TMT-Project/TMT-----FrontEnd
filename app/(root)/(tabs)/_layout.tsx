import React from "react";
import { Tabs } from "expo-router";
import TabBar from "@/components/TabBar";

export default function Layout() {
	return (
		<Tabs tabBar={(props) => <TabBar {...props} />}>
			<Tabs.Screen
				name="Home"
				options={{
					title: "Home",
					headerShown: false,
				}}
			/>
			<Tabs.Screen
				name="Search"
				options={{ title: "Search", headerShown: false }}
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
