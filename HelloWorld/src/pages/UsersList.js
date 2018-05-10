import React, { Component } from 'react';
import { Text, View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { StackNavigator } from 'react-navigation';
import LoginScreen from './LoginScreen';


export default class UsersList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: []
        }
        const { navigation } = this.props;
        const responseJson = navigation.getParam('responseJson', '');
        this.getList(responseJson);
    }
    
    renderItem = ({item}) => {
        return (
            <TouchableOpacity onPress={() => this.onButtonPress(item.id)}>
                <View style={styles.view}>
                  <Text style={styles.nameText}>
                    Name: {item.name}
                  </Text>
                  <Text style={styles.roleText}>
                    Role: {item.role}
                  </Text>
                </View>
            </TouchableOpacity>
        );
    }

    onButtonPress(id) {
        this.props.navigation.navigate('UserDetail', {
            userId: id
        });
    }

    getList(responseJson) {
        fetch('https://tq-template-server-sample.herokuapp.com/users?pagination={"page":0 , "window":100}', {
            method: 'GET',
            headers: {
              Authorization: responseJson.data.token,
            }
        }).then((response) => {
            return(response.json());
        }).then((responseUserList) => {
            if(responseUserList.data) {
              this.setState({data: responseUserList.data});
            }
            else {
                alert(responseUserList.errors[0].message);
                this.props.navigation.goBack();
                return null
            }
        })
        .catch((error) => {
            console.log(error);
            return null
        });
    }

    render() {
        return (
            <FlatList
              style={styles.container}
              data={this.state.data}
              renderItem={this.renderItem}
              keyExtractor={(item) => item.id.toString()}
            />
        );
    }
}
  
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

export { UsersList }