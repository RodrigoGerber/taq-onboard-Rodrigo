import React, { Component } from 'react';
import { Text, View, StyleSheet, Switch } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { Header, Input, Button, Spinner} from '../components';
import Events from '../../events.js'

export default class UserCreation extends Component {
    constructor(props) {
        super(props)
        const { navigation } = this.props;
        this.token = navigation.getParam('token', '')
        this.data = navigation.getParam('data', '')
        this.userId = navigation.getParam('userId', '')
        if(this.data) {
            this.state = {
                email: this.data.data.email,
                password: this.data.data.password,
                name: this.data.data.name,
                roleAdmin: this.getBooleanRole(this.data),
                error: '',
                loading: false,
                editing: true
            }
        }
        else {
            this.state = {
                email: '',
                password: '',
                name: '',
                roleAdmin: false,
                error: '',
                loading: false,
                editing: false
            }
        }
    }

    validateInputs() {
        var regexName = /^[a-zA-Z\s]*$/;
        var regexEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(!regexName.test(this.state.name)) {
            this.onError('Invalid Name (Only Letters).');
            return false;
        }
        else if(!regexEmail.test(this.state.email)) {
            this.onError('Invalid Email.');
            return false;
        }
        else if(this.state.password.length < 4) {
            this.onError('Invalid Password.');
            return false;
        }
        return true;
    }

    serverPost() {
        fetch('https://tq-template-server-sample.herokuapp.com/users', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: this.token,
            },
            body: JSON.stringify({
              email: this.state.email,
              password: this.state.password,
              name: this.state.name,
              role: this.setRole()
            }),
          }).then((response) => {
              return(response.json());
          })
              .then((responseJson) => {
                if(responseJson.errors[0].name === 'EmailError') {
                  this.onSuccess()
                }
                else this.onError(responseJson.errors[0].original);
              })
              .catch((error) => {
                console.log(error);
              });
    }

    serverPut() {
        fetch('https://tq-template-server-sample.herokuapp.com/users/'+this.userId, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              Authorization: this.token,
            },
            body: JSON.stringify({
              email: this.state.email,
              password: this.state.password,
              name: this.state.name,
              role: this.setRole()
            }),
          }).then((response) => {
              return(response.json());
          })
              .then((responseJson) => {
                if(responseJson.data) {
                  this.onSuccess()
                }
                else this.onError(responseJson.errors[0].original);
              })
              .catch((error) => {
                console.log(error);
              });
    }

    onSuccess() {
        this.setState({
            error: '',
            loading: false
          });
          Events.publish('UsersListChanged')
          this.props.navigation.navigate('UsersList');
    }

    onError(error) {
        this.setState({
          error: error,
          loading: false
        });
    }

    onCreateButtonPress() {
        this.setState({
          error: '',
          loading: true
        })
        if(this.validateInputs()) {
            this.serverPost();
        }
    }

    onSaveButtonPress() {
        this.setState({
          error: '',
          loading: true
        })
        if(this.validateInputs()) {
            this.serverPut();
        }
    }

    renderButton() {
        if(this.state.loading)
            return <Spinner size='small'/>;
        else if(this.state.editing)
            return(
                <Button 
                    onPress = {() => this.onSaveButtonPress()}
                    text = 'Save'
                />
            );
        else return(
            <Button 
                    onPress = {() => this.onCreateButtonPress()}
                    text = 'Create'
            />
        )
        
    }

    toggleSwitchAdmin = (value) => {
        this.setState({roleAdmin: value})
    }

    setRole = () => {
        if(this.state.roleAdmin)
            return 'admin';
        else return 'user';
    }

    getBooleanRole = (data) => {
        if(data.data.role == 'admin')
            return true;
        else return false;
    }

    render() {
        return(
            <View style={styles.container}>
                <Header text='User Creation'/>
                <View>
                    <Input
                        placeholder='name'
                        text='Name'
                        secureTextEntry={false}
                        onChangeText={(name) => this.setState({name})}
                        value={this.state.name}
                    />
                    <Input
                        placeholder='me@example.com'
                        text='Email'
                        secureTextEntry={false}
                        onChangeText={(email) => this.setState({email})}
                        value={this.state.email}
                    />
                    <Input
                        placeholder='password'
                        text='Password'
                        secureTextEntry={true}
                        onChangeText={(password) => this.setState({password})}
                        value={this.state.password}
                    />
                    <View style={{flexDirection: 'row', marginVertical: 15}}>
                        <Text style={styles.adminLabel}>Admin?</Text>
                        <Switch
                            onValueChange= {this.toggleSwitchAdmin}
                            value= {this.state.roleAdmin}
                            onTintColor= '#33F4C0'
                            style={{ transform: [{ scaleX: .8 }, { scaleY: .8 }] }}
                        />
                    </View>
                    <Text style={styles.errorText}>
                        {this.state.error}
                    </Text>
                    {this.renderButton()}
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
        alignItems: 'center',
    },
    errorText: {
        fontSize: 16,
        color: 'white',
        padding: 10,
        alignSelf: 'center',
        flexWrap: 'wrap'
    },
    adminLabel: {
        fontSize: 14,
        color: '#33F4C0',
        marginLeft: 3,
        marginRight: 5,
        marginTop: 5,
    }
})

export { UserCreation }