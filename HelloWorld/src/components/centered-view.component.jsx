import React from 'react'
import { View } from 'react-native';

const styles = {
  alignItems: 'center',
  justifyContent: 'center'
};

export const CenteredView = ({ children }) => {
  return (
    <View styles={styles}>
      { children }
    </View>
  );
}
