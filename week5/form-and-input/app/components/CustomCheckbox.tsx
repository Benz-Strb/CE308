import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

interface CheckboxProps {
  label: string;
  checked: boolean;
  onPress: () => void;
  error?: string;
  touched?: boolean;
}

export default function CustomCheckbox({
  label,
  checked,
  onPress,
  error,
  touched,
}: CheckboxProps) {
  const hasError = touched && error;

  return (
    <View className="w-full mb-4">
      {/* Checkbox Container */}
      <TouchableOpacity
        onPress={onPress}
        className="flex-row items-center"
        activeOpacity={0.7}
      >
        {/* Checkbox Box */}
        <View
          className={`
            w-6 h-6 rounded border-2 mr-3
            ${checked ? 'bg-blue-600 border-blue-600' : 'bg-white border-gray-300'}
            ${hasError ? 'border-red-500' : ''}
            flex items-center justify-center
          `}
        >
          {/* Checkmark */}
          {checked && (
            <Text className="text-white font-bold text-sm">✓</Text>
          )}
        </View>

        {/* Label */}
        <Text className="text-gray-700 text-base flex-1">
          {label}
        </Text>
      </TouchableOpacity>

      {/* Error Message */}
      {hasError && (
        <Text className="text-red-500 text-sm mt-1 ml-9">
          {error}
        </Text>
      )}
    </View>
  );
}