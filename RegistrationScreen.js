import React, { useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet, Text, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
const RegistrationScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = async () => {
    if (password !== confirmPassword) {
        Alert.alert('Error', 'Passwords do not match');
        return;
      }
  
      try {

        const storedData = await AsyncStorage.getItem('userData');
        const userData = storedData ? JSON.parse(storedData) : [];
  
        const isEmailRegistered = userData.some(user => user.email === email);
        if (isEmailRegistered) {
          Alert.alert('Error', 'Email already registered');
          return;
        }
 
        const newUser = { email, password };
        userData.push(newUser);
        await AsyncStorage.setItem('userData', JSON.stringify(userData));
  
        Alert.alert('Success', 'Registration successful');
        navigation.navigate('Login');

      } catch (error) {
        Alert.alert('Error', 'Registration failed');
        console.log(error);
      }
  };

  const handleLoginLinkPress = () => {
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />
      <Button title="Register" onPress={handleRegister} />

      <View style={styles.linksContainer}>
        <Text style={styles.textLink}>
          Already have an account?
        </Text>
        <TouchableOpacity onPress={handleLoginLinkPress}>
          <Text style={[styles.textLink, styles.boldText]}> Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  input: {
    height: 40,
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  linksContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  textLink: {
    fontSize: 16,
  },
  boldText: {
    fontWeight: 'bold',
    color: 'blue',
  },
});

export default RegistrationScreen;
