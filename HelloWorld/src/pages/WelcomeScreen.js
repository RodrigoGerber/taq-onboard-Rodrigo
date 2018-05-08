import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { StackNavigator } from 'react-navigation';
import LoginScreen, { styles } from './LoginScreen';


export default class WelcomeScreen extends Component {
    render() {
        const { navigation } = this.props;
        const token = navigation.getParam('token', '');
        const username = navigation.getParam('username', '');
        
        return(
            <View 
            style={{
                flex: 1,
                backgroundColor: 'black',
                alignItems: 'center',
                justifyContent: 'center'}
            }>
                <Text style={{fontSize: 28, color: '#33F4C0'}}>
                    Hello, {username}! Welcome to my first app ;)
                </Text>
            </View>
        );
    }
}

export { WelcomeScreen }