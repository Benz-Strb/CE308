import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

type Gender = 'ชาย' | 'หญิง' | 'ไม่ระบุ' | '';

interface GenderSelectorProps {
  label: string;
  selectedGender: Gender;
  onSelect: (gender: Gender) => void;
  error?: string;
  touched?: boolean;
}

export default function GenderSelector({
  label,
  selectedGender,
  onSelect,
  error,
  touched,
}: GenderSelectorProps) {
  const hasError = touched && error;

  const genders: Gender[] = ['ชาย', 'หญิง', 'ไม่ระบุ'];

  return (
    <View className="w-full mb-4 px-6">
      {/* Label */}
      <Text className="text-gray-700 font-semibold mb-2 text-base">
        {label}
      </Text>

      {/* Radio Buttons Container - Horizontal */}
      <View className="flex-row gap-4">
        {genders.map((gender) => (
          <TouchableOpacity
            key={gender}
            onPress={() => onSelect(gender)}
            className="flex-row items-center"
            activeOpacity={0.7}
          >
            {/* Radio Button Circle */}
            <View
              className={`
                w-5 h-5 rounded-full border-2 mr-2
                ${selectedGender === gender ? 'border-blue-600' : 'border-gray-300'}
                ${hasError ? 'border-red-500' : ''}
                flex items-center justify-center
              `}
            >
              {/* Inner Dot */}
              {selectedGender === gender && (
                <View className="w-3 h-3 rounded-full bg-blue-600" />
              )}
            </View>

            {/* Label */}
            <Text className="text-gray-700 text-base">
              {gender}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Error Message */}
      {hasError && (
        <Text className="text-red-500 text-sm mt-1">
          {error}
        </Text>
      )}
    </View>
  );
}