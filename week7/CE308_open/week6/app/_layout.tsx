import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="details"
        options={{
          title: 'Product Details',
          headerStyle: { backgroundColor: '#2C1A0E' },
          headerTintColor: '#FAF7F2',
          headerTitleStyle: { fontWeight: '800', fontSize: 17 },
          headerBackTitle: 'Back',
        }}
      />
    </Stack>
  );
}