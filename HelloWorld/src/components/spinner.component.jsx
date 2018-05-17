import React from 'react'
import { ActivityIndicator, View } from 'react-native'

const Spinner = ({ size }) => {
    return (
        <View style={styles.spinnerStyle}>
            <ActivityIndicator 
                size={size || 'large'}
                color='#33F4C0'
            />
        </View>
    );
};

const styles = {
    spinnerStyle: {
        justifyContent: 'center',
        alignItems: 'center',
    }
};

export { Spinner };