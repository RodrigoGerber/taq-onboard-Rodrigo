import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { Header, Input, Button, Spinner} from '../components';
import Events from '../../events.js'

export default class UserCreation extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            name: '',
            role: '',
            error: '',
            loading: false
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
        else if(this.state.role != 'admin' && this.state.role != 'user') {
            this.onError('Invalid Role.');
            return false;
        }
        return true;
    }

    serverAuthorization() {
        const { navigation } = this.props;
        const token = navigation.getParam('token', '');
        fetch('https://tq-template-server-sample.herokuapp.com/users', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: token,
            },
            body: JSON.stringify({
              email: this.state.email,
              password: this.state.password,
              name: this.state.name,
              role: this.state.role
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

    onButtonPress() {
        this.setState({
          error: '',
          loading: true
        })
        if(this.validateInputs()) {
            this.serverAuthorization();
        }
    }

    renderButton() {
        if(this.state.loading)
            return <Spinner size='small'/>;
        
        return(
            <Button 
                onPress = {() => this.onButtonPress()}
                text = 'Create'
            />
        );
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
                    <Input
                        placeholder='admin/user'
                        text='Role'
                        secureTextEntry={false}
                        onChangeText={(role) => this.setState({role})}
                        value={this.state.role}
                    />
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
    }
})

export { UserCreation }