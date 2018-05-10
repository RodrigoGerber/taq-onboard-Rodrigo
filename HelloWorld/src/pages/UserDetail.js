import React, { Component } from 'react';
import { Text, View, StyleSheet, FlatList } from 'react-native';
import { StackNavigator } from 'react-navigation';

export default class UserDetail extends Component {
    constructor(props) {
        super(props)
        const { navigation } = this.props;
    }
    
    render() {
        const userId = this.props.navigation.getParam('userId', '');
        return(
            <View style={{ flex: 1, marginTop: 20 }}>
                <Text>O userID é: {userId}</Text>
            </View>
        );
    }
}

export { UserDetail }