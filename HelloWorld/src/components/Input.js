import React from 'react';
import { Text, TextInput, View, StyleSheet } from 'react-native';

const Input = ({placeholder, text, secureTextEntry, onChangeText, value}) => {
    return (
        <View style={styles.container}>
            <Text style={styles.inputName}>{text}</Text>
            <TextInput
                style={styles.inputBar}
                placeholder={placeholder}
                placeholderTextColor= '#D3D3D3'
                secureTextEntry={secureTextEntry}
                onChangeText={onChangeText}
                value={value}
                autoCapitalize='none'
                autoCorrect={false}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'flex-start'
    },
    inputBar: {
        padding: 10,
        backgroundColor: 'black',
        borderBottomWidth: 2,
        borderBottomColor: '#33F4C0',
        marginBottom: 10,
        height: 40,
        width: 300,
        color: 'white',
        alignSelf: 'center'
    },
    inputName: {
        fontSize: 14,
        color: '#33F4C0',
        marginLeft: 3,
        marginTop: 5,
    }
});

export { Input };