import React, {Component} from 'react'
import { Text, View } from 'react-native';
import { Button, Input, Spinner, CenteredView } from '../../components'
import { styles } from './'

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
    return (
      <View style={styles.container}>
        <View style={styles.headerView}>
          <Text style={styles.headerText}>
            MyFirstApp
          </Text>
        </View>
        <CenteredView>
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
          { <LoginButton loading={loading} onButtonPress={onButtonPress} /> }
        </CenteredView>
      </View>
    );
}

const LoginButton = ({ loading, onButtonPress }) => {
    return loading ? <Spinner size='small'/> : <Button text='Login' onPress={onButtonPress} />;
}

export { LoginScreen };
