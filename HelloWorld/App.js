import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  Alert,
  AsyncStorage,
  View
} from 'react-native';
import { createStackNavigator } from 'react-navigation';
import LoginScreen from './src/pages/LoginScreen'
import WelcomeScreen from './src/pages/WelcomeScreen'

export default class App extends Component {
  render() {
    return <RootStack />;
  }
}

const RootStack = createStackNavigator({
  Home: {
    screen: LoginScreen
  },
  Welcome: {
    screen: WelcomeScreen
  }
});