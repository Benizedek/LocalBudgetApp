import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import DashboardScreen from '../screens/DashboardScreen';
import TransactionsScreen from '../screens/TransactionsScreen';
import Ionicons from '@expo/vector-icons/Ionicons';
import { View, Text, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const Tab = createMaterialTopTabNavigator();

function AppHeader() {
  const insets = useSafeAreaInsets();
  return (
    <View style={{
      backgroundColor: '#0f172a',
      paddingTop: Platform.OS === 'android' ? insets.top + 16 : insets.top + 12,
      paddingBottom: 16,
      paddingHorizontal: 20,
    }}>
      <Text style={{ 
        color: '#f8fafc', 
        fontSize: 24, 
        fontWeight: '800', 
        fontFamily: 'Segoe UI' 
      }}>
        Local Budget
      </Text>
    </View>
  );
}

export default function MainNavigation() {
  return (
    <View style={{ flex: 1, backgroundColor: '#0f172a' }}>
      <AppHeader />
      <NavigationContainer theme={DarkTheme}>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color }) => {
              let iconName: any = 'help';
              if (route.name === 'Dashboard') {
                iconName = focused ? 'stats-chart' : 'stats-chart-outline';
              } else if (route.name === 'Transactions') {
                iconName = focused ? 'list' : 'list-outline';
              }
              return <Ionicons name={iconName} size={20} color={color} />;
            },
            tabBarStyle: {
              backgroundColor: '#0f172a',
              borderBottomWidth: 1,
              borderBottomColor: '#1e293b',
            },
            tabBarActiveTintColor: '#3b82f6',
            tabBarInactiveTintColor: '#64748b',
            tabBarIndicatorStyle: {
              backgroundColor: '#3b82f6',
              height: 3,
              borderTopLeftRadius: 3,
              borderTopRightRadius: 3,
            },
            tabBarLabelStyle: {
              fontSize: 14,
              fontWeight: '600',
              textTransform: 'none',
              marginTop: 4,
            },
            tabBarShowIcon: true,
            swipeEnabled: true,
          })}
        >
          <Tab.Screen 
            name="Dashboard" 
            component={DashboardScreen} 
            options={{ tabBarLabel: 'Dashboard & Analysis' }} 
          />
          <Tab.Screen 
            name="Transactions" 
            component={TransactionsScreen} 
            options={{ tabBarLabel: 'Ledger' }} 
          />
        </Tab.Navigator>
      </NavigationContainer>
    </View>
  );
}
