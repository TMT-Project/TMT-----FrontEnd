import { View, Text } from "react-native";
import SafeAreaWrapper from "@/components/SafeAreaWrapper";
import {
  responsiveFontSize,
  responsiveWidth,
} from "react-native-responsive-dimensions";

export default function History() {
  return (
    <SafeAreaWrapper>
      <View
        className="w-full flex flex-row items-center justify-center"
        style={{
          marginTop: responsiveWidth(1),
          padding: responsiveWidth(2.5),
          marginBottom: responsiveWidth(5),
        }}
      >
        <Text
          style={{
            fontSize: responsiveFontSize(3),
            marginBottom: responsiveWidth(2),
          }}
          className="text-primary-500 font-bold"
        >
          History
        </Text>
      </View>
    </SafeAreaWrapper>
  );
}
