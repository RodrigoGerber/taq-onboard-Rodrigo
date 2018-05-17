import React, { Component } from 'react';
import { Text, View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { Header, Button } from '../components/'
import Events from '../../events'


export default class UsersList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: []
        }
        this.subscription = Events.subscribe('UsersListChanged', () => this.getUsersList(responseJson))
        const { navigation } = this.props;
        const responseJson = navigation.getParam('responseJson', '');
        this.getUsersList(responseJson);
    }

    renderItem = ({item}) => {
        return (
          <TouchableOpacity onPress={() => this.onUserButtonPress(item.id)}>
            <View style={styles.view}>
              <View style={{ flexDirection: 'row', flex: 1 }}>
                <Text style={styles.nameLabel}>
                  Name:
                </Text>
                <Text style={styles.nameText}>
                  {item.name}
                </Text>
              </View>
              <View style={{ flexDirection: 'row', flex: 1 }}>
                <Text style={styles.roleLabel}>
                  Role:
                </Text>
                <Text style={styles.roleText}>
                  {item.role}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        );
    }

    onUserButtonPress(id) {
        const responseJson = this.props.navigation.getParam('responseJson', '');
        this.props.navigation.navigate('UserDetail', {
            userId: id,
            responseJson: responseJson
        });
    }

    onCreateButtonPress() {
        const token = this.props.navigation.getParam('token', '');
        this.props.navigation.navigate('UserCreation', {token: token, data: null})
    }

    getUsersList(responseJson) {
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
            <View style={styles.container}>
                <Header text= 'Users List'/>
                <FlatList
                  style={styles.listContainer}
                  data={this.state.data}
                  renderItem={this.renderItem}
                  keyExtractor={(item) => item.id.toString()}
                />
                <Button
                    onPress = {() => this.onCreateButtonPress()}
                    text = 'Create New User'
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
        alignItems: 'center'
    },
    listContainer: {
        borderWidth: 2,
        borderColor: '#33F4C0',
        alignSelf: 'stretch'
    },
    view: {
        padding: 15,
        margin: 10,
        backgroundColor: 'black',
        borderColor: 'white',
        borderRadius: 5,
        borderWidth: 3,
    },
    nameLabel: {
        color: 'white',
        fontSize: 18,
    },
    nameText: {
        color: '#33F4C0',
        fontSize: 18,
        marginLeft: 5,
        fontWeight: 'bold',
    },
    roleLabel: {
        color: 'white',
        fontSize: 16,
    },
    roleText: {
        color: '#33F4C0',
        fontSize: 16,
        marginLeft: 5,
        fontWeight: 'bold',
    },
})

export { UsersList }
