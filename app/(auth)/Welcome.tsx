import { View, Text, TouchableOpacity, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useState, useRef } from "react";
import { router } from "expo-router";
import Swiper from "react-native-swiper";
import { onboarding } from "../../constants";
import CustomButton from "../../components/CustomButton";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

export default function Welcome() {
	const swiperRef = useRef<Swiper>(null);
	const [activeIndex, setActiveIndex] = useState(0);
	const isLastSlide = activeIndex === onboarding.length - 1;

	const handleNext = () => {
		if (swiperRef.current && !isLastSlide) {
			swiperRef.current.scrollBy(1);
		} else {
			router.push("/(auth)/Initial");
		}
	};
	return (
		<SafeAreaView className="flex h-full items-center justify-between bg-white">
			<TouchableOpacity
				onPress={() => {
					router.push("/(root)/(tabs)/Home");
				}}
				className="w-full flex justify-end items-end p-5"
			>
				<Text className="text-xl text-black/70 font-JakartaBold underline">
					skip{" "}
				</Text>
			</TouchableOpacity>
			<Swiper
				ref={swiperRef}
				loop={false}
				dot={
					<View className="w-[32px] h-[4px] mx-1 bg-[#e2e8f0] rounded-full" />
				}
				activeDot={
					<View className="w-[32px] h-[4px] mx-1 bg-[#0286ff] rounded-full" />
				}
				onIndexChanged={(index) => setActiveIndex(index)}
			>
				{onboarding.map((item, index) => (
					<View key={index} className="flex items-center justify-center p-5">
						<Image source={item.image} className="w-full h-[300px]" />
						<View className="flex flex-row items-center justify-center w-full mt-10">
							<Text className="text-3xl text-black font-bold mx-10 text-center">
								{item.title}
							</Text>
						</View>
						<Text className="text-lg font-JakartaSemiBold text-center mx-5 mt-3 text-[#858585]">
							{item.description}
						</Text>
					</View>
				))}
			</Swiper>

			<CustomButton
				title={isLastSlide ? "Get Started" : "Next"}
				className="w-11/12 mt-10 transition-all duration-1000 ease-in-out"
				onPress={handleNext}
				IconRight={() => (
					<FontAwesome6 name="arrow-right-long" size={30} color="white" />
				)}
			/>
		</SafeAreaView>
	);
}
