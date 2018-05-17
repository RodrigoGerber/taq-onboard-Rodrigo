import React, { Component } from 'react'
import { Text, View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Button, Header } from '../../../components'
import { styles , ClickableUser } from './';

const UsersList = (
  {
    data,
    onPress
  }) => {
    return(
      <View style={styles.container}>
        <Header text= 'Users List'/>
        <FlatList
          style={styles.listContainer}
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
        />
        <Button
          onPress = {() => this.onCreateButtonPress()} //vai ficar só onPress
          text = 'Create New User'
        />
      </View>
    )
}

const renderItem = (name, role) => {
  return (
    <ClickableUser
      onButtonPress={onPress}
      name={name}
      role={role}
    />
  );
}


