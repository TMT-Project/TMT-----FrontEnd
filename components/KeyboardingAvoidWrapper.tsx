import {
	View,
	KeyboardAvoidingView,
	Platform,
	ScrollView,
	TouchableWithoutFeedback,
	Keyboard,
} from "react-native";
import React from "react";

export default function KeyboardingAvoidWrapper({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<KeyboardAvoidingView
			style={{ flex: 1 }}
			behavior={Platform.OS === "ios" ? "padding" : "height"}
		>
			<ScrollView>
				<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
					<View>{children}</View>
				</TouchableWithoutFeedback>
			</ScrollView>
		</KeyboardAvoidingView>
	);
}
