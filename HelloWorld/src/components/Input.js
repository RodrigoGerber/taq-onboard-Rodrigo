import React from 'react';
import { Text, TextInput, View, StyleSheet } from 'react-native';

const Input = ({placeholder, text, secureTextEntry, onChangeText}) => {
    return (
        <View>
            <Text style={styles.inputName}>{text}</Text>
            <TextInput
                style={styles.inputBar}
                placeholder={placeholder}
                secureTextEntry={secureTextEntry}
                onChangeText={onChangeText}
                autoCapitalize='none'
                autoCorrect={false}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    inputBar: {
        padding: 10,
        backgroundColor: '#ffb3b3',
        marginVertical: 10,
        height: 40,
        width: 300
    },
    inputName: {
        fontSize: 14,
        color: '#000',
        marginLeft: 2
    }
});

export default Input;