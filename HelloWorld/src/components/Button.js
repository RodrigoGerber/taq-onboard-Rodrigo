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
    color: 'white',
    fontSize: 16,
    fontWeight: '800',
    paddingTop: 10,
    paddingBottom: 10
  },
  buttonStyle: {
    backgroundColor: 'black',
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#33F4C0',
    margin: 5,
    width: 300
  }
};

export { Button };