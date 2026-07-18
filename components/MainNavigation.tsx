import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import DashboardScreen from '../screens/DashboardScreen';
import TransactionsScreen from '../screens/TransactionsScreen';
import Ionicons from '@expo/vector-icons/Ionicons';
import { View, Text, Platform, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAuth } from '../context/AuthContext';

const Tab = createMaterialTopTabNavigator();

function AppHeader() {
  const insets = useSafeAreaInsets();
  const { signOut } = useAuth();

  return (
    <View style={{
      backgroundColor: '#0f172a',
      paddingTop: Platform.OS === 'android' ? insets.top + 16 : insets.top + 12,
      paddingBottom: 16,
      paddingHorizontal: 20,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    }}>
      <Text style={{ 
        color: '#f8fafc', 
        fontSize: 24, 
        fontWeight: '800', 
        fontFamily: 'Segoe UI' 
      }}>
        Local Budget
      </Text>
      <TouchableOpacity
        onPress={signOut}
        activeOpacity={0.7}
        style={{
          paddingVertical: 6,
          paddingHorizontal: 14,
          borderRadius: 6,
          borderWidth: 1,
          borderColor: '#334155',
          backgroundColor: '#1e293b',
        }}
      >
        <Text style={{
          color: '#94a3b8',
          fontSize: 13,
          fontWeight: '600',
          fontFamily: 'Segoe UI',
        }}>
          Log Out
        </Text>
      </TouchableOpacity>
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
