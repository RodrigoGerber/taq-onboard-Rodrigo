import React from 'react';
import { Text, TextInput, View, StyleSheet } from 'react-native';

const Input = ({placeholder, text, secureTextEntry, onChangeText, value}) => {
    return (
        <View>
            <Text style={styles.inputName}>{text}</Text>
            <TextInput
                style={styles.inputBar}
                placeholder={placeholder}
                placeholderTextColor= '#1A7D62'
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
    inputBar: {
        padding: 10,
        backgroundColor: '#7DF8D7',
        marginVertical: 10,
        height: 40,
        width: 300
    },
    inputName: {
        fontSize: 14,
        color: '#33F4C0',
        marginLeft: 2
    }
});

export { Input };