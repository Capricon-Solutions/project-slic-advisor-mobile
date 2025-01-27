/**
 * Sample React Native App with Stack Navigator
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from 'react-native-splash-screen'

import {
  StyleSheet,
  Text,
  View,
  useColorScheme,
} from 'react-native';
import LoginScreen from './src/pages/Auth/login';
import AgentNavigator from './src/pages/Agent/AgentNavigator/AgentNavigator';
import Profile from './src/pages/Profile/Profile';
import SalesMeter from './src/pages/Agent/SalesMeter/SalesMeter';

// Sample Home Screen
const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home Screen</Text>
    </View>
  );
};

// Sample Details Screen
const DetailsScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Details Screen</Text>
    </View>
  );
};

const Stack = createNativeStackNavigator();

function App(): React.JSX.Element {

  useEffect(() => {
    SplashScreen.hide();
  }, []);


  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? '#333333' : '#ffffff',
  };

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false, animation: "slide_from_right" }}>
        {/* Define your screens here */}
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="AgentNavigator" component={AgentNavigator} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="SalesMeter" component={SalesMeter} />
        {/* <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default App;
