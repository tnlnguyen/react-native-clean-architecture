import React from 'react';
import { StyleSheet } from 'react-native';
import { Button as PaperButton } from 'react-native-paper';

const Button = ({ mode, style, ...props }) => {
  return (
    <PaperButton
      style={[styles.button, mode === 'outlined', style]}
      labelStyle={styles.text}
      mode={mode}
      {...props}
    />
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    width: '100%',
    marginVertical: 10,
    paddingVertical: 2,
  },
  text: {
    fontWeight: 'bold',
    fontSize: 15,
    lineHeight: 26,
  },
});
