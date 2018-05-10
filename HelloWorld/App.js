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
import { LoginScreen, UsersList, UserDetail } from './src/pages/';

export default class App extends Component {
  render() {
    return <RootStack />;
  }
}

const RootStack = createStackNavigator({
  Home: {
    screen: LoginScreen
  },
  UsersList: {
    screen: UsersList
  },
  UserDetail: {
    screen: UserDetail
  }
});