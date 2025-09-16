import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ImageBackground,
  Image,
} from 'react-native';
import Logo from '../images/resqyou.png'; // Import the logo image

const SignupScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignup = () => {
    // Validate form fields
    if (username === '' || email === '' || password === '' || confirmPassword === '') {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    // Email validation with regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert('Error', 'Please enter a valid email address');
      return;
    }

    // Implement your signup logic here
    Alert.alert(
      'Success',
      'Account created successfully!',
      [
        {
          text: 'OK',
          onPress: () => navigation.navigate('Login')  // Redirect to login after successful signup
        }
      ]
    );
  };

  return (
    <ImageBackground
      style={styles.background}
    >
      <View style={styles.glassContainer}>
        <Image source={Logo} style={styles.logo} />
        <Text style={styles.headerText}>Create Account</Text>

        <TextInput
          style={styles.input}
          placeholder="Username"
          placeholderTextColor="#999"
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#999"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#999"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          placeholderTextColor="#999"
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
        
        <TouchableOpacity style={styles.button} onPress={handleSignup}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
        
        <View style={styles.loginText}>
          <Text>Already have an account? <TouchableOpacity onPress={() => navigation.navigate('Login')}><Text style={styles.loginLink}>Login</Text></TouchableOpacity></Text>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    backgroundColor: '#fff30', // Light pink background color
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },
  glassContainer: {
    width: '40%', // Adjusted width for web (smaller for larger screens)
    maxWidth: 500, // Set a maximum width for larger screens
    padding: 30, // Increased padding for better spacing
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)', // Border for the frosted effect
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10, // Shadow for Android
    backdropFilter: 'blur(10px)', // Frosted glass effect (for web)
    alignItems: 'center', // Center-align content inside the container
  },
  logo: {
    width: 120, // Slightly smaller logo than login screen
    height: 120,
    marginBottom: 10,
    resizeMode: 'contain',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  input: {
    width: '100%', // Full width inside the container
    height: 55, // Slightly smaller than login for more compact form with more fields
    borderColor: 'rgba(255, 255, 255, 0.5)',
    borderWidth: 1,
    borderRadius: 15,
    paddingHorizontal: 20,
    marginBottom: 15, // Slightly less margin than login
    backgroundColor: 'rgba(255, 255, 255, 0.3)', // Semi-transparent white
    color: '#333',
    textAlign: 'start',
    fontSize: 16,
  },
  button: {
    width: '100%',
    height: 55,
    backgroundColor: 'rgba(193, 1, 193, 0.8)', // Same as login for consistency
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    marginTop: 15, // Slightly less margin than login
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  loginText: {
    color: '#141414ff',
    marginTop: 15,
    textAlign: 'center',
  },
  loginLink: {
    color: '#181818ff',
    fontWeight: 'bold',
  }
});

export default SignupScreen;
