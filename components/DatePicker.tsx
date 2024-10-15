import { View, TextInput, Pressable, Platform } from "react-native";
import React, { useEffect, useState } from "react";
import DateTimePicker, {
	DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import InputField from "./InputField";

export default function DatePicker({
	onChange,
}: {
	onChange: (date: Date) => void;
}) {
	const [date, setDate] = useState(new Date());
	const [showPicker, setShowPicker] = useState(false);

	function onDateChange(
		event: DateTimePickerEvent,
		selectedDate?: Date | undefined,
	) {
		const currentDate = selectedDate || date;
		console.log(event.type);
		if (event.type === "set") {
			setDate(() => {
				setShowPicker(false);
				return currentDate;
			});
		}
	}

	useEffect(() => {
		onChange(date);
	}, [date]);

	return (
		<View>
			<Pressable onPress={() => setShowPicker(true)}>
				<InputField
					inputStyle="border border-black p-3 rounded-lg w-full text-2xl text-black"
					inputContainerStyle="border-0"
					placeholder="Select Date"
					value={date.toDateString()}
					editable={false}
				></InputField>
			</Pressable>

			{showPicker && (
				<DateTimePicker
					mode="date"
					display="spinner"
					value={date}
					onChange={onDateChange}
					maximumDate={new Date()}
				/>
			)}
		</View>
	);
}
