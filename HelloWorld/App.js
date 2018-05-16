import React, { Component } from 'react';
import { createStackNavigator } from 'react-navigation';
import { LoginScreen, UsersList, UserDetail, UserCreation } from './src/pages/';
import LoginScreenContainer from './src/containers/LoginScreenContainer';

export default class App extends Component {
  render() {
    return <RootStack />;
  }
}

const RootStack = createStackNavigator({
  Home: {
    screen: LoginScreenContainer
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