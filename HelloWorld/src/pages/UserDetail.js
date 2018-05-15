import React, { Component } from 'react';
import { Text, View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { Header, Button } from '../components';
import Events from '../../events.js'

export default class UserDetail extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: {}
        }
        const { navigation } = this.props;
        this.userId = this.props.navigation.getParam('userId', '');
        this.responseJson = this.props.navigation.getParam('responseJson', '');
        this.getUserDetail()
    }

    getUserDetail() {
        fetch('https://tq-template-server-sample.herokuapp.com/users/'+JSON.stringify(this.userId), {
            method: 'GET',
            headers: {
              Authorization: this.responseJson.data.token,
            }
        }).then((response) => {
            return(response.json());
        }).then((responseUserDetail) => {
            if(responseUserDetail.data) {
              this.setState({data: responseUserDetail.data});
            }
            else {
                alert(responseUserDetail.errors[0].message);
                this.props.navigation.goBack();
                return null
            }
        })
        .catch((error) => {
            console.log(error);
            return null
        });
    }

    deleteUser() {
        fetch('https://tq-template-server-sample.herokuapp.com/users/'+JSON.stringify(this.userId), {
            method: 'DELETE',
            headers: {
              Authorization: this.responseJson.data.token,
            }
        }).then((response) => {
            return(response.json());
        }).then((responseUserDeletion) => {
            if(responseUserDeletion.data) {
                alert('User Deleted');
                Events.publish('UsersListChanged')
                this.props.navigation.goBack();
            }
            else {
                alert(responseUserDetail.errors[0].message);
                this.props.navigation.goBack();
                return null
            }
        })
        .catch((error) => {
            console.log(error);
            return null
        });
    }
    
    onEditButtonPress() {
        this.props.navigation.navigate('UserCreation', {
            token: this.responseJson.data.token, 
            data: this.state,
            userId: this.userId});
    }

    onDeleteButtonPress() {
        this.deleteUser();
    }

    render() {
        return(
            <View style={styles.container}>
                <Header text='User Detail'/>
                <View style={styles.detailCard}>
                    <View style={styles.cardSection}>
                        <Text style={styles.label}>
                          Name: 
                        </Text>
                        <Text style={styles.text}>
                          {this.state.data.name}
                        </Text>
                    </View>
                    <View style={styles.cardSection}>
                        <Text style={styles.label}>
                          Role: 
                        </Text>
                        <Text style={styles.text}>
                          {this.state.data.role}
                        </Text>
                    </View>
                    <View style={styles.cardSection}>
                        <Text style={styles.label}>
                          Email: 
                        </Text>
                        <Text style={styles.text}>
                          {this.state.data.email}
                        </Text>
                    </View>
                </View>
                <View style= {{flexDirection: 'row'}}>
                    <TouchableOpacity onPress={() => this.onEditButtonPress()} style= {styles.editButtonStyle}>
                        <Text style={styles.buttonText}>Edit User</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.onDeleteButtonPress()} style= {styles.deleteButtonStyle}>
                        <Text style={styles.buttonText}>Delete User</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'black',
        flex: 1,
        alignContent: 'center'
    },
    detailCard: {
        backgroundColor: 'black',
        borderColor: 'white',
        borderWidth: 3,
        borderRadius: 4,
        padding: 5,
        marginVertical: 10,
        marginHorizontal: 5,
        flexWrap: 'wrap',
        height: 250
    },
    cardSection: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: 'white',
        borderTopWidth: 1,
        borderTopColor: 'white',
        padding: 2,
        marginBottom: 12,
        marginTop: 12,
        alignItems: 'center',
        marginLeft: 5,
        marginRight: 5,
        flexWrap: 'wrap',
        flex: 1
    },
    label: {
        color: 'white',
        fontSize: 18,
    },
    text: {
        color: '#33F4C0',
        fontSize: 18,
        marginLeft: 5,
        fontWeight: 'bold',
    },
    buttonText: {
        alignSelf: 'center',
        color: 'white',
        fontSize: 14,
        fontWeight: '800',
        paddingTop: 10,
        paddingBottom: 10
    },
    editButtonStyle: {
        backgroundColor: 'black',
        borderRadius: 5,
        borderWidth: 2,
        borderColor: '#33F4C0',
        alignSelf: 'center',
        flex: 1,
        margin: 5,
        width: 150
    },
    deleteButtonStyle: {
        backgroundColor: 'black',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: 'white',
        alignSelf: 'center',
        flex: 1,
        margin: 5,
        width: 150
    }
})

export { UserDetail }