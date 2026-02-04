import { Text, TouchableOpacity } from 'react-native';

type CustomButtonProps = {
    title: string;
    onPress: () => void;
    variant?: "primary" | "secondary" | "danger";
    size?: "sm" | "md" | "lg";
};

export const CustomButton = ({
    title,
    onPress,
    variant = "primary",
    size = "md",
}: CustomButtonProps) => {

    const variantClasses = {
        primary: "bg-blue-500 active:bg-blue-700",
        secondary: "bg-gray-500 active:bg-gray-700",
        danger: "bg-red-500 active:bg-red-700",
    };

    const sizeClasses = {
        sm: "px-3 py-1 text-xs",
        md: "px-4 py-1.5 text-sm",
        lg: "px-5 py-2 text-base",
    };

    return (
        <TouchableOpacity
            className={[
                variantClasses[variant],
                sizeClasses[size],
                "rounded self-start"
            ].join(' ')}
            onPress={onPress}
        >
            <Text className='text-white font-semibold'>{title}</Text>
        </TouchableOpacity>
    );
};