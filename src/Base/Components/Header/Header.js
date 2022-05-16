import React from 'react';
import { StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';

const Header = (props) => {
  return <Text style={styles.header} {...props} />;
};

export default Header;

const styles = StyleSheet.create({
  header: {
    fontSize: 21,
    color: 'blue',
    fontWeight: 'bold',
    paddingVertical: 12,
  },
});
