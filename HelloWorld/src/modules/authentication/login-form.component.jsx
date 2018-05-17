import { Text } from 'react-native';
import { styles } from './login.styles';
import { Input, Spinner, Button } from '../../components';

// não estou usando essa classe em nenhum lugar ainda
export default class LoginForm {
  state = {
    email: '',
    password: ''
  }

  render() {
    return (
      <View>
       <Input
         placeholder='me@example.com'
         text='Email'
         secureTextEntry={false}
         onChangeText={handleEmailChanged}
       />
       <Input
          placeholder='password'
          text='Password'
          secureTextEntry={true}
          onChangeText={handlePasswordChanged}
        />
        <Text style={styles.errorText}>
          {error}
        </Text>
        { <LoginButton loading={loading} onButtonPress={onButtonPress} />}
      </View>
    );
  }

  handleEmailChanged = (email) => {
    this.setState({ email });
  }

  handlePasswordChanged = (password) => {
    this.setState({ password });
  }

  onButtonPressed = () => {
    this.props.submitForm(this.state.email, this.state.password);
  }
}
