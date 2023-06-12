import React, { useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet, Text, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {

        const storedData = await AsyncStorage.getItem('userData');
        const userData = storedData ? JSON.parse(storedData) : [];

        const user = userData.find(user => user.email === email && user.password === password);
        if (user) {
          Alert.alert('Success', 'Login successful');

        } else {
          Alert.alert('Error', 'Incorrect email or password');
        }
      } catch (error) {
        Alert.alert('Error', 'Login failed');
        console.log(error);
      }
    };
  const handleSignupLinkPress = () => {
    navigation.navigate('Registration');
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
      <Button title="Login" onPress={handleLogin} />

      <View style={styles.linksContainer}>
        <Text style={styles.textLink}>
          Don't have an account?
        </Text>
        <TouchableOpacity onPress={handleSignupLinkPress}>
          <Text style={[styles.textLink, styles.boldText]}> Sign up</Text>
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

export default LoginScreen;
