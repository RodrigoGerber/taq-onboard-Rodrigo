import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

const Button = ({ onPress, text }) => {
  const { buttonStyle, textStyle } = styles;

  return (
    <TouchableOpacity onPress={onPress} style={buttonStyle}>
      <Text style={textStyle}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};

const styles = {
  textStyle: {
    alignSelf: 'center',
    color: '#000',
    fontSize: 16,
    fontWeight: '600',
    paddingTop: 10,
    paddingBottom: 10
  },
  buttonStyle: {
    backgroundColor: '#ff6666',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#000',
    margin: 5
  }
};

export default Button;