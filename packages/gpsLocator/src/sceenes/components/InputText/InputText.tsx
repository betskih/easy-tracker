import React, { FunctionComponent } from 'react';
import { View, TextInput, StyleSheet, TextInputProps } from 'react-native';

interface IInputTextProps extends TextInputProps {}

export const InputText: FunctionComponent<IInputTextProps> = (props) => {
  return (
    <View style={styles.wrapper}>
      <TextInput {...props} style={styles.input} />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    paddingLeft: 33,
    paddingRight: 33,
  },
  input: {
    width: '100%',
    borderRadius: 5,
    backgroundColor: '#C4C4C4',
    color: '#000000',
    fontSize: 30,
    lineHeight: 35,
    fontWeight: 'normal',
    textAlign: 'center',
  },
});
