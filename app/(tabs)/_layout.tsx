import { Tabs } from 'expo-router';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#FFFFFF',
        tabBarInactiveTintColor: 'rgba(255,255,255,0.6)',
        tabBarStyle: {
          backgroundColor: '#059669',
          borderTopWidth: 0,
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '500',
        },
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="HomeScreen"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons 
              name="home" 
              size={24} 
              color={focused ? '#FFFFFF' : 'rgba(255,255,255,0.6)'} 
            />
          ),
        }}
      />
      <Tabs.Screen
        name="CustomerScreen"
        options={{
          title: 'Customers',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons 
              name="people" 
              size={24} 
              color={focused ? '#FFFFFF' : 'rgba(255,255,255,0.6)'} 
            />
          ),
        }}
      />
      <Tabs.Screen
        name="SequenceScreen"
        options={{
          title: 'Sequence',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons 
              name="list" 
              size={24} 
              color={focused ? '#FFFFFF' : 'rgba(255,255,255,0.6)'} 
            />
          ),
        }}
      />
      <Tabs.Screen
        name="ReadWaterScreen"
        options={{
          title: 'Meter Read',
          tabBarIcon: ({ color, focused }) => (
            <MaterialCommunityIcons 
              name="gauge" 
              size={24} 
              color={focused ? '#FFFFFF' : 'rgba(255,255,255,0.6)'} 
            />
          ),
        }}
      />
    </Tabs>
  );
}