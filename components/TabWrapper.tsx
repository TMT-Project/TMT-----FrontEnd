import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import {
  responsiveFontSize,
  responsiveWidth,
} from "react-native-responsive-dimensions";

declare interface TabWrapperProps {
  RightIcon?: React.FC | undefined;
  LeftIcon?: React.FC | undefined;
  label?: string;
  event?: React.FC | any;
}

export default function TabWrapper({
  RightIcon,
  LeftIcon,
  label,
  event,
  ...props
}: TabWrapperProps) {
  return (
    <TouchableOpacity
      onPress={event}
      className="bg-primary-200 border border-primary-300 w-full rounded-full"
      style={{
        paddingVertical: responsiveWidth(2.5),
        paddingHorizontal: responsiveWidth(5),
      }}
    >
      <View className="w-full flex flex-row items-center justify-between">
        <View
          className="flex flex-row items-center"
          style={{ gap: responsiveWidth(2.5) }}
        >
          {LeftIcon && <LeftIcon />}
          <Text
            className=" font-bold"
            style={{ fontSize: responsiveFontSize(2) }}
          >
            {label}
          </Text>
        </View>
        {RightIcon && <RightIcon />}
      </View>
    </TouchableOpacity>
  );
}
