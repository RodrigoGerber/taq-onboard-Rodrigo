import React, { Component } from 'react';
import { Text, View, StyleSheet, FlatList } from 'react-native';
import { StackNavigator } from 'react-navigation';
import LoginScreen from './LoginScreen';


export default class WelcomeScreen extends Component {
    renderItem = ({item}) => {
        return (
            <View style={styles.view}>
              <Text style={styles.nameText}>
                Name: {item.name}
              </Text>
              <Text style={styles.roleText}>
                Role: {item.role}  
              </Text>
            </View>
        );
      }
      
    render() {
        //const { navigation } = this.props;
        //const responseJson = navigation.getParam('responseJson', '');   
    
        return (
          <FlatList
            style={styles.container}
            data={users}
            renderItem={this.renderItem}
            keyExtractor={extractKey}
          />
        );
    }
}


const users = [
    {id: '0', name: 'Rodrigo', role: 'Admin'},
    {id: '1', name: 'Gabriel', role: 'Trainee'},
    {id: '2', name: 'Alexandre', role: 'Trainee'},
    {id: '3', name: 'Leandro', role: 'Trainee'},
    {id: '4', name: 'Tiba', role: 'Trainer'},
]
  
const extractKey = ({id}) => id
  
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black'
  },
  view: {
    padding: 15,
    marginBottom: 5,
    marginTop: 5,
    backgroundColor: 'black',
    borderColor: '#33F4C0',
    borderRadius: 5,
    borderWidth: 2
  },
  nameText: {
    color: '#33F4C0',
    fontSize: 18,
    flex: 1
  },
  roleText: {
    color: '#33F4C0',
    fontSize: 16,
    flex: 1
  }
})

export { WelcomeScreen }