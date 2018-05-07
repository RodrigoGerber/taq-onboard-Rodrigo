/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  Alert,
  AsyncStorage,
  View
} from 'react-native';
import Button from './src/components/Button'
import Input from './src/components/Input'

export default class App extends Component {
  state = {
    email: '',
    password: ''
  }

  validate() {
    var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(!regex.test(this.state.email)) {
      alert('Email inválido.');
    }
    else if(this.state.password.length < 4) {
      alert('Senha inválida.');
    }
    else fetch('https://tq-template-server-sample.herokuapp.com/authenticate', {
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
    }).then((response) => response.json())
        .then((responseJson) => {
          if(responseJson.data) {
            const token = AsyncStorage.getItem('@token:key');
            //TODO: mudar para tela welcome
          }
          else
            //alert();
        })
        .catch((error) => {
          alert(console.error(error));
        });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.headerView}>
          <Text style={styles.headerText}>
            MyFirstApp
          </Text>
        </View>
        <View>
          <Input 
            placeholder='me@example.com'
            text='Email'
            secureTextEntry={false}
            onChangeText={(text) => this.setState({email: text})}
          />
          <Input
            placeholder='password'
            text='Password'
            secureTextEntry={true}
            onChangeText={(text) => this.setState({password: text})}
          />
          <Button
            text='Login'
            onPress={() => {
              this.validate();
            }}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#ff8080',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  headerView: {
    marginBottom: 20,
    paddingTop: 15,
    elevation: 2
  },
  headerText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000'
  }
});
