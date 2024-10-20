import { View, Pressable } from "react-native";
import { useEffect, useState } from "react";
import DateTimePicker, {
	DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import InputField from "./InputField";
import { Ionicons } from "@expo/vector-icons";

export default function DatePicker({
	onChange,
	error,
	value,
	label,
}: {
	onChange: (date: Date) => void;
	error?: string;
	value?: string;
	label?: string;
}) {
	const [date, setDate] = useState(new Date());
	const [showPicker, setShowPicker] = useState(false);

	function onDateChange(
		event: DateTimePickerEvent,
		selectedDate?: Date | undefined,
	) {
		const currentDate = selectedDate || date;
		if (event.type === "set") {
			setDate(() => {
				setShowPicker(false);
				return currentDate;
			});
		}
	}

	useEffect(() => {
		if (value == "") {
			setDate(new Date());
		}
	}, [value]);

	useEffect(() => {
		onChange(date);
	}, [date]);

	function getMaxDate() {
		const maxDate = new Date();

		let newMonth = maxDate.getMonth() + 6;

		if (newMonth >= 12) {
			maxDate.setFullYear(maxDate.getFullYear() + 1);
			newMonth = newMonth % 12;
		}

		maxDate.setMonth(newMonth);
		maxDate.setDate(30);

		if (maxDate.getDate() !== 30) {
			maxDate.setDate(0);
		}

		return maxDate;
	}

	return (
		<View>
			<Pressable onPress={() => setShowPicker(true)}>
				<InputField
					inputStyle="text-black"
					// inputContainerStyle="border-0"
					label={label}
					value={date.toDateString()}
					editable={false}
					errors={error}
					LeftIcon={() => (
						<Ionicons name="calendar-clear" size={24} color="#0286FF" />
					)}
				/>
			</Pressable>

			{showPicker && (
				<DateTimePicker
					mode="date"
					display="spinner"
					value={date}
					onChange={onDateChange}
					minimumDate={new Date()}
					maximumDate={getMaxDate()}
				/>
			)}
		</View>
	);
}
