import React, {Component} from 'react'
import {
  Platform,
  StyleSheet,
  Text,
  Alert,
  AsyncStorage,
  View
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import { Button, Input, Spinner } from '../components/'
import { events } from '../../events'


export default class LoginScreen extends Component {
  state = {
    email: 'admin@taqtile.com',
    password: '1111',
    loading: false,
    error: ''
  }

  validateInputs() {
    var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(!regex.test(this.state.email)) {
      this.onError('Invalid Email.');
      return false;
    }
    else if(this.state.password.length < 4) {
      this.onError('Invalid Password.');
      return false;
    }
    return true;
  }

  serverAuthorization() {
    fetch('https://tq-template-server-sample.herokuapp.com/authenticate', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password,
        rememberMe: false
      }),
    }).then((response) => {
        return(response.json());
    })
        .then((responseJson) => {
          if(responseJson.data) {
            AsyncStorage.setItem('token' , responseJson.data.token)
            AsyncStorage.setItem('username' , responseJson.data.user.name)
            .then(() => this.onSuccess(responseJson))
          }
          else this.onError(responseJson.errors[0].message);
        })
        .catch((error) => {
          console.log(error);
        });
  }

  onSuccess(responseJson) {
    this.setState({
      error: '',
      email: '',
      password: '',
      loading: false
    });
    this.props.navigation.navigate('UsersList', {
      responseJson: responseJson,
      token: responseJson.data.token
    });
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
    if(this.state.loading){
      return <Spinner size='small'/>;
    }
    
    return (
      <Button
        text='Login'
        onPress={this.onButtonPress.bind(this)}
      />
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.headerView}>
          <Text style={styles.headerText}>
            MyFirstApp
          </Text>
        </View>
        <View style={styles.loginFormView}>
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
    padding: 20,
    backgroundColor: 'black',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  headerView: {
    marginBottom: 20,
    paddingTop: 15,
    elevation: 2
  },
  loginFormView: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  headerText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#33F4C0'
  },
  errorText: {
    fontSize: 18,
    color: 'white',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export { LoginScreen };