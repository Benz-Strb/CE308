import "./global.css"
import React, { useState } from "react";
import {
  Text,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import CustomInput from "./components/CustomInput";
import CustomButton from "./components/CustomButton";
import CustomCheckbox from "./components/CustomCheckbox";
import GenderSelector from "./components/Genderselector";
import DatePickerField from "./components/Datepickerfield ";

// Type สำหรับเพศ
type Gender = 'ชาย' | 'หญิง' | 'ไม่ระบุ' | '';

// Interface สำหรับข้อมูล Form
interface FormData {
  fullName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  address: string;
  acceptTerms: boolean;
  gender: Gender;
  dateOfBirth: Date | null;
}

// Interface สำหรับ Error Messages
interface FormErrors {
  fullName?: string;
  email?: string;
  phone?: string;
  password?: string;
  confirmPassword?: string;
  address?: string;
  acceptTerms?: string;
  gender?: string;
  dateOfBirth?: string;
}

export default function Index() {
  // State สำหรับเก็บข้อมูล Form
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    address: "",
    acceptTerms: false,
    gender: '',
    dateOfBirth: null,
  });

  // State สำหรับเก็บ Error Messages
  const [errors, setErrors] = useState<FormErrors>({});

  // State สำหรับเช็คว่า field ไหนถูก touch แล้ว
  const [touched, setTouched] = useState<{ [key: string]: boolean }>({});

  // State สำหรับ loading
  const [isLoadiing, setIsLoading] = useState(false);

  // ฟังก์ชัน Validation สำหรับแต่ละ field
  const validateField = (name: string, value: string | boolean | Date | null): string | undefined => {
    switch (name) {
      case "fullName" :
        if (typeof value === 'string' && !value.trim()) {
          return "กรุณากรอกชื่อ - นามสกุล";
        }
        if (typeof value === 'string' && value.trim().length < 3) {
          return "ชื่อ - นามสกุล ต้องมีอย่างน้อย 3 ตัวอักษร"
        }
        return undefined;

      case "email":
        if (typeof value === 'string' && !value.trim()) {
          return "กรุณากรอกอีเมล";
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (typeof value === 'string' && !emailRegex.test(value)) {
          return "รูปแบบอีเมลไม่ถูกต้อง";
        }
        return undefined;

        case "phone":
          if (typeof value === 'string' && !value.trim()) {
            return "กรุณากรอกเบอร์โทรศัพท์";
          }
          const phoneRegex = /^[0-9]{10}$/;
          if (typeof value === 'string' && !phoneRegex.test(value)) {
            return "เบอร์โทรศัพท์ต้องเป็นตัวเลข 10 หลัก";
          }
          return undefined;

        case "password":
          if (typeof value === 'string' && !value) {
            return "กรุณากรอกรหัสผ่าน";
          }
          if (typeof value === 'string' && value.length < 6) {
            return "รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร";
          }
          return undefined;

        case "confirmPassword":
          if (typeof value === 'string' && !value) {
            return "กรุณายืนยันรหัสผ่าน";
          }
          if (typeof value === 'string' && value !== formData.password) {
            return "รหัสผ่านไม่ตรงกัน";
          }
          return undefined;

          case "address":
          if (typeof value === 'string' && !value.trim()) {
            return "กรุณากรอกที่อยู่";
          }
          if (typeof value === 'string' && value.trim().length < 10) {
            return "ที่อยู่ต้องมีอย่างน้อย 10 ตัวอักษร";
          }
          if (typeof value === 'string' && value.trim().length > 200) {
          return "ที่อยู่ต้องไม่เกิน 200 ตัวอักษร";
          }
          return undefined;

          case "acceptTerms":
          if (typeof value === 'boolean' && !value) {
            return "กรุณายอมรับข้อตกลงและเงื่อนไข";
          }
          return undefined;

        case "gender":
          if (typeof value === 'string' && !value) {
            return "กรุณาเลือกเพศ";
          }
          return undefined;

        case "dateOfBirth":
          if (!value || !(value instanceof Date)) {
            return "กรุณาเลือกวันเกิด";
          }
          // ตรวจสอบอายุต้องมากกว่า 13 ปี
          const today = new Date();
          const birthDate = new Date(value);
          const age = today.getFullYear() - birthDate.getFullYear();
          const monthDiff = today.getMonth() - birthDate.getMonth();
          const dayDiff = today.getDate() - birthDate.getDate();
          
          // คำนวณอายุ
          let actualAge = age;
          if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
            actualAge--;
          }
          
          if (actualAge < 13) {
            return "อายุต้องมากกว่า 13 ปี";
          }
          return undefined;

          default:
            return undefined;
    }
  };

  // ฟังก์ชันจัดการเมื่อมีการเปลี่ยนแปลงค่าใน Input
  const handleChange = (name: keyof FormData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Validate realtime ถ้า field ถูก touch แล้ว
    if (touched[name]) {
      const error = validateField(name, value);
      setErrors((prev) => ({
        ...prev,
        [name]: error,
      }));
    }
  }

  // ฟังก์ชันจัดการเมื่อมีการเปลี่ยนแปลง Checkbox
  const handleCheckboxChange = () => {
    const newValue = !formData.acceptTerms;
    setFormData((prev) => ({
      ...prev,
      acceptTerms: newValue,
    }));

    // Mark as touched และ validate
    setTouched((prev) => ({
      ...prev,
      acceptTerms: true,
    }));

    const error = validateField('acceptTerms', newValue);
    setErrors((prev) => ({
      ...prev,
      acceptTerms: error,
    }));
  }

  // ฟังก์ชันจัดการเมื่อเลือกเพศ
  const handleGenderChange = (gender: Gender) => {
    setFormData((prev) => ({
      ...prev,
      gender: gender,
    }));

    // Mark as touched และ validate
    setTouched((prev) => ({
      ...prev,
      gender: true,
    }));

    const error = validateField('gender', gender);
    setErrors((prev) => ({
      ...prev,
      gender: error,
    }));
  }

  // ฟังก์ชันจัดการเมื่อเลือกวันเกิด
  const handleDateChange = (date: Date) => {
    setFormData((prev) => ({
      ...prev,
      dateOfBirth: date,
    }));

    // Mark as touched และ validate
    setTouched((prev) => ({
      ...prev,
      dateOfBirth: true,
    }));

    const error = validateField('dateOfBirth', date);
    setErrors((prev) => ({
      ...prev,
      dateOfBirth: error,
    }));
  }

  // ฟังก์ชันจัดการเมื่อ Input ถูก blur (สูญเสียโฟกัส)
  const handleBlur = (name: keyof FormData) => {
    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }));

    // Validete เมื่อ blur
    const error = validateField(name, formData[name]);
    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }));
  };
  
  // ฟังก์ชัน Validate ทั้ง Form
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    let isValid = true;

    //ตรวจสอบทุก field
    (Object.keys(formData) as Array<keyof FormData>).forEach((key) => {
      const error = validateField(key, formData[key]);
      if (error) {
        newErrors[key] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);

    // Mark ทุก field ว่าถูก touch แล้ว
    const allTouched: { [key: string]: boolean } = {};
    Object.keys(formData).forEach((key) => {
      allTouched[key] = true;
    });
    setTouched(allTouched);

    return isValid;
  };

  const handleSubmit = async () => {
    // ปิด Keyboard
    Keyboard.dismiss();

    // Validate Form
    if (!validateForm()) {
      Alert.alert("ข้อมูลไม่ถูกต้อง" , "กรุณาตรวจสอบข้อมูลใหม่อีกครั้ง");
      return;
    }

    // จำลองการส่งข้อมูล
    setIsLoading(true);

    // ฟังก์ชัน format วันที่ DD/MM/YYYY
    const formatDate = (date: Date | null): string => {
      if (!date) return '-';
      const day = date.getDate().toString().padStart(2, '0');
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const year = date.getFullYear();
      return `${day}/${month}/${year}`;
    };

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      Alert.alert(
        "สำเร็จ!",
        `ลงทะเบียนสำเร็จ\n\nชื่อ: ${formData.fullName}\nเพศ: ${formData.gender}\nวันเกิด: ${formatDate(formData.dateOfBirth)}\nอีเมล: ${formData.email}\nเบอร์: ${formData.phone}\nที่อยู่: ${formData.address}`,
        [
          {
            text: "ตรวจสอบ",
            onPress: () => console.log("Form Data: ", formData),
          },
          {
            text: "รีเซทฟอร์ม",
            onPress: handleReset,
            style: "cancel",
          },
        ]
      );
    }, 2000);
  };

  // ฟังก์ชันรีเซ็ทฟอร์ม
  const handleReset = () => {
    setFormData({
      fullName: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      address: "",
      acceptTerms: false,
      gender: "",
      dateOfBirth: null,
    });
    setErrors({});
    setTouched({});
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1"
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
        className="flex-1 bg-gray-50"
        contentContainerClassName="pb-8"
        keyboardShouldPersistTaps="handled"
        >
          {/* Header */}
          <View className="bg-blue-600 pt-16 pb-8 px-6">
            <Text className="text-white text-3xl font-bold">
              ลงทะเบียนสมาชิก
            </Text>
            <Text className="text-blue-100 text-base mt-2">
              กรุณากรอกข้อมูลให้ครบถ้วน
            </Text>
          </View>

          {/* Form Container */}
          <View>
            {/* ชื่อ - นามสกุล */}
            <CustomInput
              label="ชื่อ - นามสกุล"
              placeholder="ระบุชื่อและนามสกุล"
              value={formData.fullName}
              onChangeText={(value) => handleChange("fullName", value)}
              onBlur={() => handleBlur("fullName")}
              error={errors.fullName}
              touched={touched.fullName}
              autoCapitalize="words" // ขึ้นต้นด้วยตัวพิมพ์ใหญ่ทุกคำ
            />

            {/* Gender Selector */}
            <GenderSelector
              label="เพศ"
              selectedGender={formData.gender}
              onSelect={handleGenderChange}
              error={errors.gender}
              touched={touched.gender}
            />

            {/* Date of Birth Picker */}
            <DatePickerField
              label="วันเกิด"
              value={formData.dateOfBirth}
              onChange={handleDateChange}
              error={errors.dateOfBirth}
              touched={touched.dateOfBirth}
            />

            {/* อีเมล */}
            <CustomInput
              label="อีเมล"
              placeholder="example@email.com"
              value={formData.email}
              onChangeText={(value) => handleChange("email", value)}
              onBlur={() => handleBlur("email")}
              error={errors.email}
              touched={touched.email}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />

            {/* เบอร์โทรศัพท์ */}
            <CustomInput
              label="เบอร์โทรศัพท์"
              placeholder="0812345678"
              value={formData.phone}
              onChangeText={(value) => handleChange("phone", value)}
              onBlur={() => handleBlur("phone")}
              error={errors.phone}
              touched={touched.phone}
              keyboardType="phone-pad"
              maxLength={10}
            />

             {/* รหัสผ่าน */}
            <CustomInput
              label="รหัสผ่าน"
              placeholder="อย่างน้อย 6 ตัวอักษร"
              value={formData.password}
              onChangeText={(value) => handleChange("password", value)}
              onBlur={() => handleBlur("password")}
              error={errors.password}
              touched={touched.password}
              secureTextEntry
              autoCapitalize="none"
            />

             {/* ยืนยันรหัสผ่าน */}
            <CustomInput
              label="ยืนยันรหัสผ่าน"
              placeholder="ระบุรหัสผ่านอีกครั้ง"
              value={formData.confirmPassword}
              onChangeText={(value) => handleChange("confirmPassword", value)}
              onBlur={() => handleBlur("confirmPassword")}
              error={errors.confirmPassword}
              touched={touched.confirmPassword}
              secureTextEntry
              autoCapitalize="none"
            />

            {/* ที่อยู่ */}
            <CustomInput
              label="ที่อยู่"
              placeholder="ระบุที่อยู่ของคุณ"
              value={formData.address}
              onChangeText={(value) => handleChange("address", value)}
              onBlur={() => handleBlur("address")}
              error={errors.address}
              touched={touched.address}
              multiline // รองรับ multiline
              numberOfLines={4} // กำหนดจำนวนบรรทัดเริ่มต้น
              textAlignVertical="top" // จัดข้อความให้อยู่ด้านบน
              style={{ height: 100 }} // กำหนดความสูง 100px
              maxLength={200} // กำหนดให้ตัวอักษรไม่เกิน 200 ตัว
            />

            {/* แสดงจำนวนตัวอักษร */}
            <View className="px-6 -mt-2 mb-4">
              <Text className="text-gray-500 text-xs text-right">
                {formData.address.length}/200 ตัวอักษร
              </Text>
            </View>

            {/* Checkbox ยอมรับข้อตกลง */}
            <View className="px-6">
              <CustomCheckbox
                label="ฉันยอมรับข้อตกลงและเงื่อนไข"
                checked={formData.acceptTerms}
                onPress={handleCheckboxChange}
                error={errors.acceptTerms}
                touched={touched.acceptTerms}
              />
            </View>

            {/* Buttons */}
            <View className="mt-4 space-y-3">
              <CustomButton
                title="ลงทะเบียน"
                onPress={handleSubmit}
                variant="primary"
                loading={isLoadiing}
              />

              <CustomButton
                title="รีเซ็ทฟอร์ม"
                onPress={handleReset}
                variant="secondary"
                loading={isLoadiing}
              />

              {/* Info Box */}
              <View className="mt-6 bg-blue-50 border-2 border-blue-200 rounded-lg p-4">
                <Text className="text-blue-800 font-semibold text-base mb-2">
                  คำแนะนำ
                </Text>
                <Text className="text-blue-700 text-sm leading-5">
                  - กรุณากรอกข้อมูลให้ครบถ้วน{"\n"}
                  - อีเมลต้องมีรูปแบบที่ถูกต้อง{"\n"}
                  - เบอร์โทรศัพท์ต้องเป็นตัวเลข 10 หลัก{"\n"}
                  - รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร{"\n"}
                  - ที่อยู่ต้องมีอย่างน้อย 10 ตัวอักษร และไม่เกิน 200 ตัวอักษร
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}