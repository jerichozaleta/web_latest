import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './screens/LoginScreen';
import DashboardScreen from './screens/DashboardScreen';
import HomeScreen from './screens/HomeScreen';
import NavigationScreen from './screens/NavigationScreen';
import PoliceStationScreen from './screens/PoliceStationScreen';
import MessagesScreen from './screens/MessagesScreen';
import NotificationScreen from './screens/NotificationScreen';
import SettingsScreen from './screens/SettingsScreen';
import LogoutScreen from './screens/LogoutScreen';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

// Drawer Navigator for the main app
const DrawerNavigator = () => (
  <Drawer.Navigator
    initialRouteName="Dashboard"
    screenOptions={{
      headerShown: true,
      drawerStyle: {
        backgroundColor: '#FFB6C1',
        width: 240,
      },
      drawerActiveTintColor: '#000000',
      drawerInactiveTintColor: '#000000',
      drawerLabelStyle: {
        fontSize: 16,
      },
    }}
  >
    <Drawer.Screen name="Dashboard" component={DashboardScreen} />
    <Drawer.Screen name="Home" component={HomeScreen} />
    <Drawer.Screen name="Navigation" component={NavigationScreen} />
    <Drawer.Screen name="Police Station" component={PoliceStationScreen} />
    <Drawer.Screen name="Messages" component={MessagesScreen} />
    <Drawer.Screen name="Notification" component={NotificationScreen} />
    <Drawer.Screen name="Settings" component={SettingsScreen} />
    <Drawer.Screen name="Logout" component={LogoutScreen} />
  </Drawer.Navigator>
);

// Main App with LoginScreen as the initial screen
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LoginScreen">
        {/* Login Screen */}
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{ headerShown: false }} // Hide header for login
        />
        {/* Drawer Navigator */}
        <Stack.Screen
          name="MainApp"
          component={NavigationScreen}
          options={{ headerShown: false }} // Hide header for the drawer

        />
        {/* Additional Screens */}
        <Stack.Screen name="NavigationScreen" component={NavigationScreen} />
        <Stack.Screen name="NotificationScreen" component={NotificationScreen} />
        <Stack.Screen name="PoliceStationScreen" component={PoliceStationScreen} />
        <Stack.Screen name="SettingsScreen" component={SettingsScreen} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}