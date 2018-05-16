import React, {Component} from 'react'
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import { Button, Input, Spinner } from '../components/'


const LoginScreen = (
  {
    loading,
    onChangeEmail,
    email,
    onChangePassword,
    password,
    error,
    onButtonPress
  }) => { 
  
  if(loading){
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
            onChangeText={onChangeEmail}
            value={email}
          />
          <Input
            placeholder='password'
            text='Password'
            secureTextEntry={true}
            onChangeText={onChangePassword}
            value={password}
          />
          <Text style={styles.errorText}>
            {error}
          </Text>
          <Spinner size='small'/>;
        </View>
      </View>
    );
  }
  else
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
            onChangeText={onChangeEmail}
            value={email}
          />
          <Input
            placeholder='password'
            text='Password'
            secureTextEntry={true}
            onChangeText={onChangePassword}
            value={password}
          />
          <Text style={styles.errorText}>
            {error}
          </Text>
          <Button
            text='Login'
            onPress={onButtonPress}
          />
        </View>
      </View>
    );
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