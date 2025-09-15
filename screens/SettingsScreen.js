import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const SettingsScreen = ({ navigation }) => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [locationServices, setLocationServices] = useState(true);
  const [emergencyAlerts, setEmergencyAlerts] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [autoBackup, setAutoBackup] = useState(true);

  const SettingsItem = ({ icon, title, subtitle, onPress, rightComponent, showBorder = true }) => (
    <TouchableOpacity 
      style={[styles.settingsItem, !showBorder && styles.noBorder]} 
      onPress={onPress}
    >
      <View style={styles.settingsItemLeft}>
        <View style={styles.iconContainer}>
          <Icon name={icon} size={24} color="#4ECDC4" />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.settingsTitle}>{title}</Text>
          {subtitle && <Text style={styles.settingsSubtitle}>{subtitle}</Text>}
        </View>
      </View>
      <View style={styles.rightContainer}>
        {rightComponent || <Icon name="chevron-right" size={24} color="#666" />}
      </View>
    </TouchableOpacity>
  );

  const SettingsSection = ({ title, children }) => (
    <View style={styles.settingsSection}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <View style={styles.sectionContainer}>
        {children}
      </View>
    </View>
  );

  const showLogoutConfirmation = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Logout', style: 'destructive', onPress: handleLogout }
      ]
    );
  };

  const handleLogout = () => {
    // Handle logout logic here
    navigation.navigate('Login');
  };

  const showDeleteAccountConfirmation = () => {
    Alert.alert(
      'Delete Account',
      'This action cannot be undone. All your data will be permanently deleted.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', style: 'destructive', onPress: () => console.log('Account deleted') }
      ]
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Settings</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Profile Section */}
        <SettingsSection title="Profile">
          <SettingsItem
            icon="person"
            title="Edit Profile"
            subtitle="Update your personal information"
            onPress={() => navigation.navigate('EditProfile')}
          />
          <SettingsItem
            icon="security"
            title="Change Password"
            subtitle="Update your password for security"
            onPress={() => navigation.navigate('ChangePassword')}
            showBorder={false}
          />
        </SettingsSection>

        {/* Notifications Section */}
        <SettingsSection title="Notifications">
          <SettingsItem
            icon="notifications"
            title="Push Notifications"
            subtitle="Receive notifications about incidents"
            rightComponent={
              <Switch
                value={notificationsEnabled}
                onValueChange={setNotificationsEnabled}
                trackColor={{ false: '#E0E0E0', true: '#4ECDC4' }}
                thumbColor={notificationsEnabled ? '#FFFFFF' : '#FFFFFF'}
              />
            }
          />
          <SettingsItem
            icon="warning"
            title="Emergency Alerts"
            subtitle="Get notified of critical incidents"
            rightComponent={
              <Switch
                value={emergencyAlerts}
                onValueChange={setEmergencyAlerts}
                trackColor={{ false: '#E0E0E0', true: '#FF6B6B' }}
                thumbColor={emergencyAlerts ? '#FFFFFF' : '#FFFFFF'}
              />
            }
            showBorder={false}
          />
        </SettingsSection>

        {/* Privacy & Security */}
        <SettingsSection title="Privacy & Security">
          <SettingsItem
            icon="location-on"
            title="Location Services"
            subtitle="Allow app to access your location"
            rightComponent={
              <Switch
                value={locationServices}
                onValueChange={setLocationServices}
                trackColor={{ false: '#E0E0E0', true: '#4ECDC4' }}
                thumbColor={locationServices ? '#FFFFFF' : '#FFFFFF'}
              />
            }
          />
          <SettingsItem
            icon="lock"
            title="Privacy Policy"
            subtitle="Read our privacy policy"
            onPress={() => navigation.navigate('PrivacyPolicy')}
          />
          <SettingsItem
            icon="gavel"
            title="Terms of Service"
            subtitle="View terms and conditions"
            onPress={() => navigation.navigate('TermsOfService')}
            showBorder={false}
          />
        </SettingsSection>

        {/* App Settings */}
        <SettingsSection title="App Settings">
          <SettingsItem
            icon="palette"
            title="Dark Mode"
            subtitle="Switch to dark theme"
            rightComponent={
              <Switch
                value={darkMode}
                onValueChange={setDarkMode}
                trackColor={{ false: '#E0E0E0', true: '#4ECDC4' }}
                thumbColor={darkMode ? '#FFFFFF' : '#FFFFFF'}
              />
            }
          />
          <SettingsItem
            icon="language"
            title="Language"
            subtitle="English"
            onPress={() => navigation.navigate('LanguageSettings')}
          />
          <SettingsItem
            icon="backup"
            title="Auto Backup"
            subtitle="Automatically backup your data"
            rightComponent={
              <Switch
                value={autoBackup}
                onValueChange={setAutoBackup}
                trackColor={{ false: '#E0E0E0', true: '#4ECDC4' }}
                thumbColor={autoBackup ? '#FFFFFF' : '#FFFFFF'}
              />
            }
            showBorder={false}
          />
        </SettingsSection>

        {/* Support */}
        <SettingsSection title="Support">
          <SettingsItem
            icon="help"
            title="Help Center"
            subtitle="Get help and support"
            onPress={() => navigation.navigate('HelpCenter')}
          />
          <SettingsItem
            icon="feedback"
            title="Send Feedback"
            subtitle="Share your thoughts with us"
            onPress={() => navigation.navigate('Feedback')}
          />
          <SettingsItem
            icon="info"
            title="About"
            subtitle="App version 1.2.3"
            onPress={() => navigation.navigate('About')}
            showBorder={false}
          />
        </SettingsSection>

        {/* Emergency Contacts */}
        <SettingsSection title="Emergency">
          <SettingsItem
            icon="contact-phone"
            title="Emergency Contacts"
            subtitle="Manage your emergency contacts"
            onPress={() => navigation.navigate('EmergencyContacts')}
          />
          <SettingsItem
            icon="local-hospital"
            title="Nearby Hospitals"
            subtitle="Find nearby medical facilities"
            onPress={() => navigation.navigate('NearbyHospitals')}
          />
          <SettingsItem
            icon="local-police"
            title="Police Stations"
            subtitle="Locate nearest police stations"
            onPress={() => navigation.navigate('PoliceStations')}
            showBorder={false}
          />
        </SettingsSection>

        {/* Account Actions */}
        <SettingsSection title="Account">
          <SettingsItem
            icon="logout"
            title="Logout"
            subtitle="Sign out of your account"
            onPress={showLogoutConfirmation}
          />
          <SettingsItem
            icon="delete-forever"
            title="Delete Account"
            subtitle="Permanently delete your account"
            onPress={showDeleteAccountConfirmation}
            showBorder={false}
          />
        </SettingsSection>

        {/* App Info */}
        <View style={styles.appInfo}>
          <Text style={styles.appInfoText}>VAWC Prevention App</Text>
          <Text style={styles.appInfoText}>Version 1.2.3</Text>
          <Text style={styles.appInfoText}>© 2024 VAWC Prevention Initiative</Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E1E8ED',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
  },
  placeholder: {
    width: 40,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  settingsSection: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
    marginLeft: 5,
  },
  sectionContainer: {
    backgroundColor: 'white',
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  settingsItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  noBorder: {
    borderBottomWidth: 0,
  },
  settingsItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#4ECDC420',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  textContainer: {
    flex: 1,
  },
  settingsTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 2,
  },
  settingsSubtitle: {
    fontSize: 14,
    color: '#666',
  },
  rightContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  appInfo: {
    alignItems: 'center',
    paddingVertical: 20,
    marginTop: 20,
  },
  appInfoText: {
    fontSize: 12,
    color: '#666',
    marginBottom: 5,
  },
});

export default SettingsScreen;