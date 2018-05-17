import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: 'black',
      alignItems: 'center'
  },
  listContainer: {
      borderWidth: 2,
      borderColor: '#33F4C0',
      alignSelf: 'stretch'
  },
  view: {
      padding: 15,
      margin: 10,
      backgroundColor: 'black',
      borderColor: 'white',
      borderRadius: 5,
      borderWidth: 3,
  },
  nameLabel: {
      color: 'white',
      fontSize: 18,
  },
  nameText: {
      color: '#33F4C0',
      fontSize: 18,
      marginLeft: 5,
      fontWeight: 'bold',
  },
  roleLabel: {
      color: 'white',
      fontSize: 16,
  },
  roleText: {
      color: '#33F4C0',
      fontSize: 16,
      marginLeft: 5,
      fontWeight: 'bold',
  },
})
