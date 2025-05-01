import React, { useEffect, useState, useCallback } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';

// Screens
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

// Key for AsyncStorage
const PERSISTENCE_KEY = 'NAVIGATION_STATE_V1';

const DrawerNavigator = () => (
  <Drawer.Navigator
    initialRouteName="Dashboard" // Ensure this matches your default route
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

export default function App() {
  const [isReady, setIsReady] = useState(false);
  const [initialState, setInitialState] = useState();

  useEffect(() => {
    const restoreState = async () => {
      try {
        const savedStateString = await AsyncStorage.getItem(PERSISTENCE_KEY);
        const state = savedStateString ? JSON.parse(savedStateString) : undefined;
        setInitialState(state);
      } catch (e) {
        console.error('Failed to load navigation state', e);
      } finally {
        setIsReady(true);
      }
    };

    restoreState();
  }, []);

  const onStateChange = useCallback(
    async (state) => {
      try {
        await AsyncStorage.setItem(PERSISTENCE_KEY, JSON.stringify(state));
      } catch (e) {
        console.error('Failed to save navigation state', e);
      }
    },
    []
  );

  if (!isReady) return null;

  return (
    <NavigationContainer initialState={initialState} onStateChange={onStateChange}>
      <Stack.Navigator initialRouteName="MainApp">
        <Stack.Screen
          name="MainApp"
          component={DrawerNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="NavigationScreen" component={NavigationScreen} />
        <Stack.Screen name="NotificationScreen" component={NotificationScreen} />
        <Stack.Screen name="PoliceStationScreen" component={PoliceStationScreen} />
        <Stack.Screen name="SettingsScreen" component={SettingsScreen} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}