import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

interface DatePickerFieldProps {
  label: string;
  value: Date | null;
  onChange: (date: Date) => void;
  error?: string;
  touched?: boolean;
}

export default function DatePickerField({
  label,
  value,
  onChange,
  error,
  touched,
}: DatePickerFieldProps) {
  const [show, setShow] = useState(false);
  const hasError = touched && error;

  const onChangeDate = (event: any, selectedDate?: Date) => {
    const currentDate = selectedDate || value;
    setShow(Platform.OS === 'ios'); // iOS จะแสดงตลอด, Android ปิดหลังเลือก
    if (currentDate) {
      onChange(currentDate);
    }
  };

  const formatDate = (date: Date | null): string => {
    if (!date) return 'เลือกวันเกิด';
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <View className="w-full mb-4 px-6">
      {/* Label */}
      <Text className="text-gray-700 font-semibold mb-2 text-base">
        {label}
      </Text>

      {/* Date Display Button */}
      <TouchableOpacity
        onPress={() => setShow(true)}
        className={`
          w-full px-4 py-3 rounded-lg border-2 bg-white
          ${hasError ? 'border-red-500' : 'border-gray-300'}
        `}
      >
        <Text
          className={`text-base ${
            value ? 'text-gray-800' : 'text-gray-400'
          }`}
        >
          {formatDate(value)}
        </Text>
      </TouchableOpacity>

      {/* Date Picker */}
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={value || new Date()}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={onChangeDate}
          maximumDate={new Date()} // ไม่ให้เลือกวันในอนาคต
        />
      )}

      {/* Error Message */}
      {hasError && (
        <Text className="text-red-500 text-sm mt-1">
          {error}
        </Text>
      )}
    </View>
  );
}