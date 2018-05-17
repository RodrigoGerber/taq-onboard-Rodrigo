import React, {Component} from 'react'
import {
  AsyncStorage
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import { events } from '../../../events'
import serverRequest from '../../../serverRequest';
import { LoginScreen } from './login.page';


export default class LoginScreenContainer extends Component {
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

  onButtonPress= () => {
    this.setState({
      error: '',
      loading: true
    })
    if(this.validateInputs())
      serverRequest.serverLogin(this.state.email, this.state.password)
      .then((responseJson) => {
        console.log(responseJson)

        if(responseJson.data) {
            console.log(responseJson.data.token);
            AsyncStorage.setItem('token' , responseJson.data.token)
            AsyncStorage.setItem('username' , responseJson.data.user.name)
            .then(() => this.onSuccess(responseJson))
        }
        else this.onError(responseJson.errors[0].message);
      });
  }

  render() {
    return (
        <LoginScreen
            loading={this.state.loading}
            onChangeEmail={(email) => this.setState({email})}
            email={this.state.email}
            onChangePassword={(password) => this.setState({password})}
            password={this.state.password}
            error={this.state.error}
            onButtonPress={this.onButtonPress.bind(this)}
        />
    );
  }
}


export { LoginScreenContainer };
