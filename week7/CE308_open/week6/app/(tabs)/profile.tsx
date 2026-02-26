import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function ProfileScreen() {
    const menuItems = [
        { icon: 'bag-outline', label: 'คำสั่งซื้อของฉัน', count: '3' },
        { icon: 'heart-outline', label: 'รายการโปรด', count: '5' },
        { icon: 'location-outline', label: 'ที่อยู่จัดส่ง', count: null },
        { icon: 'card-outline', label: 'วิธีชำระเงิน', count: null },
        { icon: 'settings-outline', label: 'ตั้งค่าบัญชี', count: null },
    ];

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            {/* Profile Header */}
            <View style={styles.header}>
                <View style={styles.avatarRing}>
                    <View style={styles.avatar}>
                        <Ionicons name="person" size={42} color="#FAF7F2" />
                    </View>
                </View>
                <Text style={styles.name}>Somsak Digital</Text>
                <Text style={styles.email}>somsak@example.com</Text>
            </View>

            {/* Member Card */}
            <View style={styles.memberCard}>
                <View style={styles.memberLeft}>
                    <Text style={styles.memberLabel}>ARTISAN MEMBER</Text>
                    <Text style={styles.memberName}>Somsak Digital</Text>
                </View>
                <View style={styles.memberBadge}>
                    <Ionicons name="star" size={16} color="#C8502A" />
                    <Text style={styles.memberBadgeText}>GOLD</Text>
                </View>
            </View>

            {/* Menu */}
            <View style={styles.menuSection}>
                <Text style={styles.menuSectionTitle}>บัญชีของฉัน</Text>
                <View style={styles.menuCard}>
                    {menuItems.map((item, index) => (
                        <TouchableOpacity
                            key={index}
                            style={[styles.menuItem, index < menuItems.length - 1 && styles.menuItemBorder]}
                            activeOpacity={0.7}
                        >
                            <View style={styles.menuIconBox}>
                                <Ionicons name={item.icon as any} size={18} color="#C8502A" />
                            </View>
                            <Text style={styles.menuLabel}>{item.label}</Text>
                            <View style={styles.menuRight}>
                                {item.count && (
                                    <View style={styles.countBadge}>
                                        <Text style={styles.countText}>{item.count}</Text>
                                    </View>
                                )}
                                <Ionicons name="chevron-forward" size={16} color="#C4B8AA" />
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>

            {/* Logout */}
            <TouchableOpacity style={styles.logoutBtn} activeOpacity={0.8}>
                <Ionicons name="log-out-outline" size={18} color="#C8502A" />
                <Text style={styles.logoutText}>ออกจากระบบ</Text>
            </TouchableOpacity>

            <View style={{ height: 32 }} />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#FAF7F2' },

    /* Header */
    header: {
        backgroundColor: '#2C1A0E',
        alignItems: 'center',
        paddingTop: 32,
        paddingBottom: 28,
        paddingHorizontal: 24,
    },
    avatarRing: {
        width: 96,
        height: 96,
        borderRadius: 48,
        borderWidth: 3,
        borderColor: '#C8502A',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 14,
    },
    avatar: {
        width: 84,
        height: 84,
        borderRadius: 42,
        backgroundColor: '#3D2512',
        alignItems: 'center',
        justifyContent: 'center',
    },
    name: {
        fontSize: 22,
        fontWeight: '800',
        color: '#FAF7F2',
        marginBottom: 4,
    },
    email: {
        fontSize: 13,
        color: '#9C8370',
        marginBottom: 20,
    },

    /* Member Card */
    memberCard: {
        marginHorizontal: 16,
        marginTop: 16,
        backgroundColor: '#FAF0E6',
        borderRadius: 16,
        padding: 18,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderWidth: 1,
        borderColor: '#E8D5C0',
    },
    memberLeft: {},
    memberLabel: {
        fontSize: 9,
        fontWeight: '700',
        color: '#9C8370',
        letterSpacing: 2,
        marginBottom: 4,
    },
    memberName: {
        fontSize: 15,
        fontWeight: '700',
        color: '#2C1A0E',
    },
    memberBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#F0D9C8',
    },
    memberBadgeText: {
        fontSize: 12,
        fontWeight: '800',
        color: '#C8502A',
        letterSpacing: 1,
    },

    /* Menu */
    menuSection: {
        marginHorizontal: 16,
        marginTop: 24,
    },
    menuSectionTitle: {
        fontSize: 13,
        fontWeight: '700',
        color: '#9C8370',
        letterSpacing: 1,
        marginBottom: 10,
    },
    menuCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        shadowColor: '#2C1A0E',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.07,
        shadowRadius: 12,
        elevation: 3,
        overflow: 'hidden',
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 14,
        gap: 12,
    },
    menuItemBorder: {
        borderBottomWidth: 1,
        borderBottomColor: '#F5F0EA',
    },
    menuIconBox: {
        width: 36,
        height: 36,
        borderRadius: 10,
        backgroundColor: '#FAF7F2',
        alignItems: 'center',
        justifyContent: 'center',
    },
    menuLabel: {
        flex: 1,
        fontSize: 14,
        fontWeight: '600',
        color: '#1A0F07',
    },
    menuRight: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    countBadge: {
        backgroundColor: '#C8502A',
        width: 20,
        height: 20,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    countText: {
        fontSize: 11,
        fontWeight: '700',
        color: '#fff',
    },

    /* Logout */
    logoutBtn: {
        marginHorizontal: 16,
        marginTop: 16,
        borderRadius: 14,
        paddingVertical: 14,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        borderWidth: 1.5,
        borderColor: '#EDE8E1',
        backgroundColor: '#FFFFFF',
    },
    logoutText: {
        fontSize: 14,
        fontWeight: '700',
        color: '#C8502A',
    },
});