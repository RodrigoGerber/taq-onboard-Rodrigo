import React, { Component } from 'react';
import { createStackNavigator } from 'react-navigation';
import { LoginScreen, UsersList, UserDetail, UserCreation } from './src/pages/';

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
  },
  UserCreation: {
    screen: UserCreation
  }
});