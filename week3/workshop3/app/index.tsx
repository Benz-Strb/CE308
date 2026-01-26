import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  FlatList
} from 'react-native';

const DATA_like = [
  { id: '1', title: 'ดูหนัง Sci-Fi และ Horror' },
  { id: '2', title: 'อ่านข่าวและศึกษาข้อมูลใหม่ ๆ' },
  { id: '3', title: 'เล่นเกม Moba และ RPG' },
  { id: '4', title: 'เล่นกับแมว' },
  { id: '5', title: 'การออกไปกินบุฟเฟ่ต์ตอนเย็น' },
  { id: '6', title: 'การนอนอยู่เฉย ๆ ไม่ทำอะไรเลย' },
  { id: '7', title: 'เรื่องชาวบ้าน' },
];

const DATA_dont_like = [
  { id: '100', title: 'สถานที่ที่คนเยอะ' },
  { id: '102', title: 'สถานที่ที่เสียงดัง' },
  { id: '103', title: 'คนรบกวนเวลาดูหนัง' },
  { id: '104', title: 'ไปเที่ยว' },
  { id: '105', title: 'การตกแต่งชิ้นงาน หรือใด ๆ ที่เกี่ยวกับศิลปะ' },
];

const App = () => {

  // ฟังก์ชันสำหรับสร้างหน้าตาของแต่ละแถว (เปรียบเหมือน <li>)
  const renderItem_like = ({ item }: { item: { id: string; title: string} }) => (
    <View style={styles.itemContainer}>
      <View style={styles.dot_like} />
      <Text style={styles.itemText}>{item.title}</Text>
    </View>
  );

  const renderItem_dont_like = ({ item }: { item: { id: string; title: string} }) => (
    <View style={styles.itemContainer}>
      <View style={styles.dot_dont_like} />
      <Text style={styles.itemText}>{item.title}</Text>
    </View>
  );

  return (
    <ScrollView contentContainerStyle={styles.scrollContent}>
      {/* contentContainerStyle ตือการกำหนดสไตล์ให้กับเนื้อหาภายใน ScrollView */}

      {/* ส่วนหัวข้อ (Header) */}
      <View style={styles.header}>
        <Text style={styles.headerText}>My Profile</Text>
      </View>

      {/* การใช้ Flexbox จัดเรียงการ์ดแนว row */}
      <View style={styles.row}>
        <View style={[styles.box, { backgroundColor: '#FF6B6B' }]}>
          <Text style={styles.boxText}>รหัสนักศึกษา{'\n'}66112106</Text>
        </View>
        <View style={[styles.box, { backgroundColor: '#9cd9b1' }]}>
          <Text style={styles.boxText}>คณะ{'\n'}วิศวกรรมศาสตร์</Text>
        </View>
        <View style={[styles.box, { backgroundColor: '#b19cd9' }]}>
          <Text style={styles.boxText}>สาขา{'\n'}คอมพิวเตอร์</Text>
        </View>
      </View>

      {/* ตัวอย่างเนื้อหายาว ๆ เพื่อทดสอบ ScrollView */}

      {/* ข้อมูลส่วนตัว */}
      <View style={styles.contentSection}>
        <Text style={styles.title}>ข้อมูลส่วนตัว:</Text>
          <View style={styles.listItem}>
            <Text>ชื่อ: ณัฐวุฒิ นาดอน</Text>
          </View>
          <View style={styles.listItem}>
            <Text>ชื่อเล่น: เบ็นซ์</Text>
          </View>
          <View style={styles.listItem}>
            <Text>อีเมล: nd.natthawutbenz@gmail.com</Text>
          </View>
      </View>

      {/* การศึกษา */}
      <View style={styles.contentSection}>
        <Text style={styles.title}>การศึกษา:</Text>
          <View style={styles.listItem}>
            <Text>ระดับอุดมศึกษา: มหาวิทยาลัยธุรกิจบัณฑิตย์</Text>
          </View>
          <View style={styles.listItem}>
            <Text>สาขา: วิศวกรรมคอมพิวเตอร์ (ชั้นปีที่ 3)</Text>
          </View>
      </View>

      {/* ที่อยู่ */}
      <View style={styles.contentSection}>
        <Text style={styles.title}>การศึกษา:</Text>
          <View style={styles.listItem}>
            <Text>269/98 ซอยจรัญสนิทวงศ์ 35 ถนนจรัญสนิทวงศ์ แขวงบางขุนศรี เขตบางกอกน้อย กรุงเทพมหานคร 10700</Text>
          </View>
      </View>

      {/* สิ่งที่ชอบ */}
      <View style={styles.contentSection}>
        <FlatList
          data={DATA_like} //ข้อมูลที่จะนำมาแสดง
          renderItem={renderItem_like} // ฟังก์ชันวาดหน้าตาแต่ละแถว
          keyExtractor={item => item.id}  // กำหนด Key ให้แต่ละแถว
          ListHeaderComponent={<Text style={styles.headerFlatList}>สิ่งที่ชอบ</Text>}
        />
      </View>

      {/* สิ่งที่ไม่ชอบ */}
      <View style={styles.contentSection}>
        <FlatList
          data={DATA_dont_like}
          renderItem={renderItem_dont_like}
          keyExtractor={item => item.id}
          ListHeaderComponent={<Text style={styles.headerFlatList}>สิ่งที่ไม่ชอบ</Text>}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContent: {
    padding: 20,
  },
  header: {
    height: 100,
    backgroundColor: '#d9b19c',
    justifyContent: 'center', // จัดกลางแนวตั้ง
    alignItems: 'center', // จัดกลางแนวนอน
    borderRadius: 10,
    marginBottom: 20,
  },
  headerText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },

  row: {
    flexDirection: 'row',  // จัดเรียงแนวนอน
    justifyContent: 'space-between', // เว้นระยะห่างระหว่างกัน
    marginBottom: 20,
  },
  box: {
    flex: 1,              // แบ่งพื้นที่เท่า ๆ กัน
    height: 100,
    marginHorizontal: 5,  // เว้นระยะห่างระหว่างกล่อง
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  boxText: {
    color: 'white',
    fontWeight: '600',
    textAlign: 'center'
  },

  contentSection: {
    marginTop: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  listItem: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
    borderLeftWidth: 5,
    borderLeftColor: '#d09cd9',
  },

  contentSectionFlatList: {
    marginTop: 20,
  },
  headerFlatList: {
    fontSize: 24,
    fontWeight: 'bold',
    padding: 20,
    backgroundColor: '#9cc4d9',
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  dot_like: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#9cd9b1',
    marginRight: 10,
  },
  dot_dont_like: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ff6b6b',
    marginRight: 10,
  },
  itemText: {
    fontSize: 18,
  },
});

export default App;