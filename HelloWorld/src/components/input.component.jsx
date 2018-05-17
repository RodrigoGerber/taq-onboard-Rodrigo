import React, { Component } from 'react';
import { Text, TextInput, View, StyleSheet } from 'react-native';

export default class Input extends Component {
  render() {
    return (
        <View style={styles.container}>
            <Text style={styles.inputName}>{this.props.text}</Text>
            <TextInput
                style={styles.inputBar}
                placeholder={this.props.placeholder}
                placeholderTextColor= '#D3D3D3'
                secureTextEntry={this.props.secureTextEntry}
                onChangeText={this.handleTextChanged}
                autoCapitalize='none'
                autoCorrect={false}
                value={this.props.value}
            />
        </View>
    );
  }

  handleTextChanged = (value) => {
    this.props.onChangeText(value);
  }
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
