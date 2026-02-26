import { View, Text, StyleSheet, ScrollView, TouchableOpacity, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

export default function HomeScreen() {
    const lists = [
        {
            id: '1',
            name: 'Premium Coffee Bean',
            price: '450',
            description: 'เมล็ดกาแฟกลางจากดอยช้าง คัดพิเศษ Single Origin',
            emoji: '☕',
            tag: 'Best Seller',
            tagColor: '#C8502A',
        },
        {
            id: '2',
            name: 'Green Tea Powder',
            price: '290',
            description: 'ผงชาเขียวแท้จากญี่ปุ่น เกรด Ceremonial',
            emoji: '🍵',
            tag: 'Organic',
            tagColor: '#3A7D44',
        },
        {
            id: '3',
            name: 'Oat Milk 1L',
            price: '115',
            description: 'นมโอ๊ตออร์แกนิค ไม่มีน้ำตาลเพิ่ม เนื้อครีมมี่',
            emoji: '🥛',
            tag: 'New',
            tagColor: '#5B6EAE',
        },
    ];

    return (
        <View style={styles.wrapper}>
            <StatusBar barStyle="light-content" />
            <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>

                {/* Hero Banner */}
                <View style={styles.heroBanner}>
                    <View style={styles.heroTextContainer}>
                        <Text style={styles.heroSubtitle}>ARTISAN MARKET</Text>
                        <Text style={styles.heroTitle}>Good Things,{'\n'}Well Sourced.</Text>
                        <View style={styles.heroTag}>
                            <Ionicons name="leaf-outline" size={13} color="#C8502A" />
                            <Text style={styles.heroTagText}>Premium Quality</Text>
                        </View>
                    </View>
                    <Text style={styles.heroBigEmoji}>🛒</Text>
                </View>

                {/* Section Header */}
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>Featured Products</Text>
                    <Text style={styles.sectionCount}>{lists.length} items</Text>
                </View>

                {/* Product List */}
                <View style={styles.listContainer}>
                    {lists.map((item, index) => (
                        <TouchableOpacity
                            key={item.id}
                            style={[styles.card, index === lists.length - 1 && { marginBottom: 32 }]}
                            onPress={() =>
                                router.push({
                                    pathname: '/details',
                                    params: {
                                        id: item.id,
                                        name: item.name,
                                        price: item.price,
                                        description: item.description,
                                        emoji: item.emoji,
                                    },
                                })
                            }
                            activeOpacity={0.85}
                        >
                            <View style={styles.emojiBox}>
                                <Text style={styles.emoji}>{item.emoji}</Text>
                            </View>

                            <View style={styles.cardInfo}>
                                <View style={styles.cardTopRow}>
                                    <Text style={styles.cardName}>{item.name}</Text>
                                    <View style={[styles.badge, { backgroundColor: item.tagColor + '18' }]}>
                                        <Text style={[styles.badgeText, { color: item.tagColor }]}>{item.tag}</Text>
                                    </View>
                                </View>
                                <Text style={styles.cardDesc} numberOfLines={1}>{item.description}</Text>
                                <View style={styles.cardBottom}>
                                    <Text style={styles.cardPrice}>฿{item.price}</Text>
                                    <View style={styles.arrowButton}>
                                        <Ionicons name="arrow-forward" size={14} color="#fff" />
                                    </View>
                                </View>
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: { flex: 1, backgroundColor: '#FAF7F2' },
    container: { flex: 1, backgroundColor: '#FAF7F2' },

    heroBanner: {
        marginHorizontal: 16,
        marginTop: 16,
        backgroundColor: '#2C1A0E',
        borderRadius: 20,
        padding: 24,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    heroTextContainer: { flex: 1 },
    heroSubtitle: {
        fontSize: 10,
        fontWeight: '700',
        color: '#C8502A',
        letterSpacing: 2.5,
        marginBottom: 6,
    },
    heroTitle: {
        fontSize: 22,
        fontWeight: '800',
        color: '#FAF7F2',
        lineHeight: 30,
        marginBottom: 12,
    },
    heroTag: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#3D2512',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 20,
        alignSelf: 'flex-start',
        gap: 4,
    },
    heroTagText: { fontSize: 11, color: '#C8502A', fontWeight: '600' },
    heroBigEmoji: { fontSize: 56, marginLeft: 8 },

    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: 16,
        marginTop: 28,
        marginBottom: 12,
    },
    sectionTitle: { fontSize: 18, fontWeight: '700', color: '#1A0F07', letterSpacing: 0.3 },
    sectionCount: { fontSize: 13, color: '#9C8370' },

    listContainer: { paddingHorizontal: 16, gap: 12 },
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 16,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 14,
        shadowColor: '#2C1A0E',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.08,
        shadowRadius: 12,
        elevation: 3,
    },
    emojiBox: {
        width: 56,
        height: 56,
        borderRadius: 14,
        backgroundColor: '#FAF7F2',
        alignItems: 'center',
        justifyContent: 'center',
    },
    emoji: { fontSize: 28 },
    cardInfo: { flex: 1, gap: 4 },
    cardTopRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 8,
    },
    cardName: { fontSize: 14, fontWeight: '700', color: '#1A0F07', flex: 1 },
    badge: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 20 },
    badgeText: { fontSize: 10, fontWeight: '700', letterSpacing: 0.3 },
    cardDesc: { fontSize: 12, color: '#9C8370', lineHeight: 17 },
    cardBottom: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 4,
    },
    cardPrice: { fontSize: 16, fontWeight: '800', color: '#C8502A' },
    arrowButton: {
        width: 26,
        height: 26,
        borderRadius: 13,
        backgroundColor: '#2C1A0E',
        alignItems: 'center',
        justifyContent: 'center',
    },
});