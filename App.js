import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

// Import your screens
import DashboardScreen from './screens/DashboardScreen';
import NavigationScreen from './screens/NavigationScreen';
import MessagesScreen from './screens/MessagesScreen';
import SettingsScreen from './screens/SettingsScreen';
import LogoutScreen from './screens/LogoutScreen';
import LoginScreen from './screens/LoginScreen';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

// Custom Drawer Content Component
const CustomDrawerContent = ({ navigation, state }) => {
  const menuItems = [
    { name: 'Dashboard', icon: 'dashboard', route: 'Dashboard' },
    { name: 'Navigation', icon: 'navigation', route: 'Navigation' },
    { name: 'Messages', icon: 'message', route: 'Messages' },
    { name: 'Settings', icon: 'settings', route: 'Settings' },
    { name: 'Logout', icon: 'logout', route: 'Logout' },
  ];

  return (
    <View style={styles.drawerContainer}>
      {/* Header */}
      <View style={styles.drawerHeader}>
        <View style={styles.logoContainer}>
          <Icon name="security" size={40} color="#4ECDC4" />
        </View>
        <Text style={styles.appTitle}>VAWC Prevention</Text>
        <Text style={styles.appSubtitle}>Violence Against Women & Children</Text>
      </View>

      {/* Menu Items */}
      <View style={styles.menuContainer}>
        {menuItems.map((item, index) => {
          const isActive = state.routeNames[state.index] === item.route;
          
          return (
            <TouchableOpacity
              key={index}
              style={[styles.menuItem, isActive && styles.activeMenuItem]}
              onPress={() => navigation.navigate(item.route)}
            >
              <View style={[styles.menuIconContainer, isActive && styles.activeMenuIconContainer]}>
                <Icon 
                  name={item.icon} 
                  size={22} 
                  color={isActive ? '#4ECDC4' : '#666'} 
                />
              </View>
              <Text style={[styles.menuText, isActive && styles.activeMenuText]}>
                {item.name}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Footer */}
      <View style={styles.drawerFooter}>
        <View style={styles.emergencySection}>
          <TouchableOpacity style={styles.emergencyButton}>
            <Icon name="emergency" size={20} color="white" />
            <Text style={styles.emergencyButtonText}>Emergency</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.footerText}>Version 1.2.3</Text>
      </View>
    </View>
  );
};

// Stack Navigator for screens that need to be pushed
const MainStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: '#F8F9FA' },
        animationEnabled: true,
        animationTypeForReplace: 'push',
      }}
    >
      <Stack.Screen name="Dashboard" component={DashboardScreen} />
      <Stack.Screen name="Navigation" component={NavigationScreen} />
      <Stack.Screen name="Settings" component={SettingsScreen} />
      <Stack.Screen name="Messages" component={MessagesScreen} />
      <Stack.Screen name="Logout" component={LogoutScreen} />
      {/* Add more stack screens as needed */}
    </Stack.Navigator>
  );
};

// Main Drawer Navigator
const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          backgroundColor: '#FFFFFF',
          width: 280,
        },
        drawerType: 'slide',
        overlayColor: 'rgba(0, 0, 0, 0.5)',
      }}
      initialRouteName="Main"
    >
      <Drawer.Screen name="Main" component={MainStackNavigator} />
      <Drawer.Screen name="Dashboard" component={DashboardScreen} />
      <Drawer.Screen name="Navigation" component={NavigationScreen} />
      <Drawer.Screen name="Messages" component={MessagesScreen} />
      <Drawer.Screen name="Settings" component={SettingsScreen} />
      <Drawer.Screen name="Logout" component={LogoutScreen} />
    </Drawer.Navigator>
  );
};

// Root App Component
const App = () => {
  return (
    <NavigationContainer>
      <DrawerNavigator />
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  drawerContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  drawerHeader: {
    backgroundColor: '#4ECDC4',
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  logoContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
  },
  appTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 5,
  },
  appSubtitle: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
  },
  menuContainer: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 10,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderRadius: 12,
    marginBottom: 5,
  },
  activeMenuItem: {
    backgroundColor: '#4ECDC420',
    borderRightWidth: 3,
    borderRightColor: '#4ECDC4',
  },
  menuIconContainer: {
    width: 35,
    alignItems: 'center',
  },
  activeMenuIconContainer: {
    // Additional styling for active icon container if needed
  },
  menuText: {
    fontSize: 16,
    color: '#666',
    fontWeight: '500',
    marginLeft: 10,
  },
  activeMenuText: {
    color: '#4ECDC4',
    fontWeight: '600',
  },
  drawerFooter: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  emergencySection: {
    marginBottom: 20,
  },
  emergencyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FF4757',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    elevation: 3,
    shadowColor: '#FF4757',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  emergencyButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  footerText: {
    fontSize: 12,
    color: '#999',
    textAlign: 'center',
  },
});

export default App;