import React, { Component } from 'react';
import { Text, View, StyleSheet, FlatList } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { Header } from '../components';

export default class UserDetail extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: {}
        }
        const { navigation } = this.props;
        const userId = this.props.navigation.getParam('userId', '');
        const responseJson = this.props.navigation.getParam('responseJson', '');
        this.getUserDetail(responseJson, userId)
    }

    getUserDetail(responseJson, userId) {
        fetch('https://tq-template-server-sample.herokuapp.com/users/'+JSON.stringify(userId), {
            method: 'GET',
            headers: {
              Authorization: responseJson.data.token,
            }
        }).then((response) => {
            return(response.json());
        }).then((responseUserDetail) => {
            if(responseUserDetail.data) {
              this.setState({data: responseUserDetail.data});
              console.log(responseUserDetail.data);
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
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'black',
        flex: 1,
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
})

export { UserDetail }