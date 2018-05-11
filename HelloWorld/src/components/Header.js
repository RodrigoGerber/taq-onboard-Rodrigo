import React from 'react';
import { Text, TextInput, View, StyleSheet } from 'react-native';

const Header = ({text}) => {
    return (
        <View style={styles.headerView}>
            <Text style={styles.headerText}>{text}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    headerView: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'black',
        borderColor: '#33F4C0',
        borderWidth: 3,
        borderRadius: 10,
        height: 50,
        margin: 10,
    },
    headerText: {
        color: 'white',
        fontSize: 22,
        fontWeight: 'bold',
    }
});

export { Header };