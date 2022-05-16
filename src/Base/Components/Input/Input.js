import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { TextInput as Input } from 'react-native-paper';

const TextInput = ({ errorText, description, ...props }) => {
  return (
    <View style={styles.container}>
      <Input style={styles.input} underlineColor="transparent" mode="outlined" {...props} />
      {description && !errorText ? <Text style={styles.description}>{description}</Text> : null}
      {errorText ? <Text style={styles.error}>{errorText}</Text> : null}
    </View>
  );
};

export default TextInput;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginVertical: 12,
  },
  input: {
    backgroundColor: 'white',
  },
  description: {
    fontSize: 13,
    color: 'yellow',
    paddingTop: 8,
  },
  error: {
    fontSize: 13,
    color: 'red',
    paddingTop: 8,
  },
});
