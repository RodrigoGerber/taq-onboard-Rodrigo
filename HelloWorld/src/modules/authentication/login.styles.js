import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
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