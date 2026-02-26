import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function DetailsScreen() {
    const { name, price, description, emoji } = useLocalSearchParams<{
        id: string;
        name: string;
        price: string;
        description: string;
        emoji: string;
    }>();

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            {/* Hero Image Area */}
            <View style={styles.heroArea}>
                <View style={styles.emojiCircle}>
                    <Text style={styles.heroEmoji}>{emoji ?? '🛍️'}</Text>
                </View>
                {/* Decorative dots */}
                <View style={[styles.dot, { top: 20, right: 30, width: 8, height: 8, opacity: 0.3 }]} />
                <View style={[styles.dot, { top: 50, right: 70, width: 5, height: 5, opacity: 0.2 }]} />
                <View style={[styles.dot, { bottom: 30, left: 40, width: 10, height: 10, opacity: 0.15 }]} />
            </View>

            {/* Content Card */}
            <View style={styles.contentCard}>
                {/* Price Badge */}
                <View style={styles.priceBadge}>
                    <Text style={styles.priceLabel}>PRICE</Text>
                    <Text style={styles.priceValue}>฿{price}</Text>
                </View>

                {/* Product Name */}
                <Text style={styles.productName}>{name}</Text>

                {/* Divider */}
                <View style={styles.divider}>
                    <View style={styles.dividerLine} />
                    <Ionicons name="leaf-outline" size={14} color="#C8502A" />
                    <View style={styles.dividerLine} />
                </View>

                {/* Description Section */}
                <View style={styles.descSection}>
                    <View style={styles.descHeader}>
                        <Ionicons name="document-text-outline" size={16} color="#9C8370" />
                        <Text style={styles.descLabel}>รายละเอียดสินค้า</Text>
                    </View>
                    <Text style={styles.descText}>{description}</Text>
                </View>

                {/* Add to Cart Button */}
                <TouchableOpacity style={styles.addToCartBtn} activeOpacity={0.85}>
                    <Ionicons name="cart-outline" size={20} color="#FAF7F2" />
                    <Text style={styles.addToCartText}>เพิ่มลงตะกร้า</Text>
                </TouchableOpacity>

                {/* Back Button */}
                <TouchableOpacity style={styles.backBtn} onPress={() => router.back()} activeOpacity={0.75}>
                    <Ionicons name="arrow-back-outline" size={16} color="#2C1A0E" />
                    <Text style={styles.backBtnText}>กลับหน้าหลัก</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#FAF7F2' },

    heroArea: {
        backgroundColor: '#2C1A0E',
        height: 220,
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
    },
    emojiCircle: {
        width: 110,
        height: 110,
        borderRadius: 55,
        backgroundColor: '#3D2512',
        alignItems: 'center',
        justifyContent: 'center',
    },
    heroEmoji: { fontSize: 52 },
    dot: {
        position: 'absolute',
        borderRadius: 999,
        backgroundColor: '#C8502A',
    },

    /* Content */
    contentCard: {
        backgroundColor: '#FFFFFF',
        marginHorizontal: 16,
        marginTop: -20,
        borderRadius: 24,
        padding: 24,
        shadowColor: '#2C1A0E',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.1,
        shadowRadius: 20,
        elevation: 5,
        marginBottom: 32,
    },

    priceBadge: {
        flexDirection: 'row',
        alignItems: 'baseline',
        gap: 8,
        marginBottom: 10,
    },
    priceLabel: {
        fontSize: 10,
        fontWeight: '700',
        color: '#9C8370',
        letterSpacing: 2,
    },
    priceValue: {
        fontSize: 28,
        fontWeight: '800',
        color: '#C8502A',
    },

    productName: {
        fontSize: 22,
        fontWeight: '800',
        color: '#1A0F07',
        lineHeight: 30,
        marginBottom: 16,
    },

    divider: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginBottom: 20,
    },
    dividerLine: {
        flex: 1,
        height: 1,
        backgroundColor: '#EDE8E1',
    },

    descSection: {
        backgroundColor: '#FAF7F2',
        borderRadius: 12,
        padding: 16,
        marginBottom: 20,
    },
    descHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        marginBottom: 8,
    },
    descLabel: {
        fontSize: 12,
        fontWeight: '600',
        color: '#9C8370',
        letterSpacing: 0.5,
    },
    descText: {
        fontSize: 15,
        color: '#4A3728',
        lineHeight: 24,
    },

    addToCartBtn: {
        backgroundColor: '#2C1A0E',
        borderRadius: 14,
        paddingVertical: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
        marginBottom: 12,
    },
    addToCartText: {
        fontSize: 16,
        fontWeight: '700',
        color: '#FAF7F2',
        letterSpacing: 0.5,
    },

    backBtn: {
        borderRadius: 14,
        paddingVertical: 13,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        borderWidth: 1.5,
        borderColor: '#EDE8E1',
    },
    backBtnText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#2C1A0E',
    },
});