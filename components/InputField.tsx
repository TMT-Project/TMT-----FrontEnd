import { View, Text, Image, TextInput } from "react-native";
import React from "react";
import { InputFieldProps } from "../types/type";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const InputField = ({
  label,
  labelStyle,
  icon,
  secureTextEntry = false,
  containerStyle,
  required,
  inputStyle,
  iconStyle,
  className,
  errors,
  ...props
}: InputFieldProps) => {
  return (
    <View className="w-full my-1 ">
      <Text className={`text-lg font-JakartaSemiBold mb-2 ${labelStyle}`}>
        {label}
      </Text>
      <View className="flex flex-row justify-start items-center relative bg-neutral-100 border border-neutral-300 focus:border-primary-500 rounded-3xl ${containerStyle}">
        {icon && (
          <Image source={icon} className={`w-6 h-6 ml-4 ${iconStyle}`} />
        )}
        <TextInput
          className={`rounded-lg p-3 font-JakartaSemiBold text-[14px] flex-1 text-left ${inputStyle}`}
          secureTextEntry={secureTextEntry}
          required={required}
          {...props}
        />
      </View>
      {errors && (
        <Text className="text-red-500 text-base font-JakartaSemiBold">
          {errors}
        </Text>
      )}
    </View>
  );
};

export default InputField;
