import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { styles } from './'

export const ClickableUser = ({ onButtonPress, name, role }) => {
    return (
      <TouchableOpacity onPress = {onButtonPress}>
        <View style={styles.view}>
          <View style={{ flexDirection: 'row', flex: 1 }}>
            <Text style={styles.nameLabel}>
              Name:
            </Text>
            <Text style={styles.nameText}>
              {name}
            </Text>
          </View>
          <View style={{ flexDirection: 'row', flex: 1 }}>
            <Text style={styles.roleLabel}>
              Role:
            </Text>
            <Text style={styles.roleText}>
              {role}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
