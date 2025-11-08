import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import { Stack, router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function LoginScreen() {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    // TODO: Add actual authentication logic here
    // For now, we'll just validate that fields are not empty
    
    // if (!userId.trim() || !password.trim()) {
    //   // TODO: Show error message
    //   console.log('Please fill in all fields');
    //   return;
    // }

    setLoading(true);

    // TODO: Replace with actual API call
    console.log('Login attempt with:', userId);
    
    // Simulate API call delay
    setTimeout(() => {
      setLoading(false);
      // Navigate to HomeScreen in tabs
      router.replace('/(tabs)/HomeScreen');
    }, 1000);
  };

  return (
    <>
      {/* Hide the header */}
      <Stack.Screen options={{ headerShown: false }} />
      
      <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.container}
          keyboardVerticalOffset={0}
        >
          <View style={styles.content}>
            {/* Logo Section */}
            <View style={styles.logoContainer}>
              <Image
                source={require('../assets/st-joseph-water.png')} // Update this path to your logo
                style={styles.logo}
                resizeMode="contain"
              />
            </View>

            {/* Form Section */}
            <View style={styles.formContainer}>
              {/* User ID Input */}
              <TextInput
                label="User ID"
                value={userId}
                onChangeText={setUserId}
                mode="outlined"
                style={styles.input}
                autoCapitalize="none"
                autoComplete="off"
                autoCorrect={false}
                outlineColor="#D1D5DB"
                activeOutlineColor="#059669"
                theme={{ roundness: 8 }}
              />

              {/* Password Input */}
              <TextInput
                label="Password"
                value={password}
                onChangeText={setPassword}
                mode="outlined"
                secureTextEntry
                style={styles.input}
                autoCapitalize="none"
                autoComplete="off"
                autoCorrect={false}
                outlineColor="#D1D5DB"
                activeOutlineColor="#059669"
                theme={{ roundness: 8 }}
              />

              {/* Submit Button */}
              <Button
                mode="contained"
                onPress={handleSubmit}
                style={styles.submitButton}
                buttonColor="#059669"
                contentStyle={styles.submitButtonContent}
                labelStyle={styles.submitButtonLabel}
                loading={loading}
                disabled={loading}
              >
                Submit
              </Button>
            </View>

            {/* Version Number */}
            <View style={styles.versionContainer}>
              <Text style={styles.versionText}>V 1.0.0</Text>
            </View>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 20,
    justifyContent: 'space-around',
  },
  logoContainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    marginTop: 40,
  },
  logo: {
    width: 200,
    height: 80,
  },
  formContainer: {
    flex: 1.5,
    justifyContent: 'center',
  },
  input: {
    marginBottom: 16,
    backgroundColor: '#FFFFFF',
  },
  submitButton: {
    marginTop: 8,
    borderRadius: 8,
  },
  submitButtonContent: {
    height: 50,
  },
  submitButtonLabel: {
    fontSize: 16,
    fontWeight: '600',
  },
  versionContainer: {
    alignItems: 'center',
    flex: 0.3,
    justifyContent: 'flex-end',
    paddingBottom: 10,
  },
  versionText: {
    fontSize: 12,
    color: '#9CA3AF',
  },
});