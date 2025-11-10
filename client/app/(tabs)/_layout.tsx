import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function TabsLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen 
        name="home" 
        options={{ tabBarIcon: ({ color, size }) => <Ionicons name="home-outline" size={size} color={color} /> }}
      />
      <Tabs.Screen 
        name="pets" 
        options={{ tabBarIcon: ({ color, size }) => <Ionicons name="paw-outline" size={size} color={color} /> }}
      />
      <Tabs.Screen 
        name="reminders" 
        options={{ tabBarIcon: ({ color, size }) => <Ionicons name="alarm-outline" size={size} color={color} /> }}
      />
      <Tabs.Screen 
        name="community" 
        options={{ tabBarIcon: ({ color, size }) => <Ionicons name="chatbubbles-outline" size={size} color={color} /> }}
      />
      <Tabs.Screen 
        name="profile" 
        options={{ tabBarIcon: ({ color, size }) => <Ionicons name="person-outline" size={size} color={color} /> }}
      />
    </Tabs>
  );
}
