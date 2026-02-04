import { View, Text, FlatList } from 'react-native';
import { CustomButton } from './CustomButton';

type ItemListProps = {
    items: { id: string, productName: string, price: number, pcs: number, btnSize: "sm" | "md" | "lg", btnColor: "primary" | "secondary" | "danger" }[];
};

export const ItemList = ({ items }: ItemListProps) => {
    const handlePress = (productName: string) => {
        console.log(`กดปุ่มของ ${productName}`);
    };

    return (
        <FlatList
            data={items}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ padding: 16 }}
            ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
            renderItem={({ item }) => (
                <View className="p-4 bg-gray-200">
                    <Text className="text-lg font-bold text-gray-800 mb-1">ชื่อสินค้า: {item.productName}</Text>
                    <Text className="text-gray-700 mb-1">ราคา: {item.price}</Text>
                    <Text className="text-gray-700 mb-3">จำนวน: {item.pcs}</Text>
                    <CustomButton 
                        title="สั่งซื้อ"
                        onPress={() => handlePress(item.productName)}
                        variant={item.btnColor}
                        size={item.btnSize}
                    />
                </View>
            )}
        />
    );
};