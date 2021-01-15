import React, { FunctionComponent } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

export enum ButtonTypes {
  red = 'red',
  blue = 'blue',
  disabled = 'disabled',
}

interface IButtonProps {
  type: ButtonTypes;
  text: string;
  onPress?: () => void;
  disabled?: boolean;
}

export const Button: FunctionComponent<IButtonProps> = ({
  type,
  text,
  onPress = () => {},
  disabled,
}) => {
  return (
    <TouchableOpacity
      style={[styles.container, styles[type], disabled && styles.disabled]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowColor: 'black',
    elevation: 4,
    marginBottom: 30,
  },
  blue: {
    backgroundColor: '#2F80ED',
    width: 136,
    height: 47,
  },
  red: {
    backgroundColor: '#B91C1C',
    width: 136,
    height: 44,
  },
  disabled: {
    backgroundColor: '#BDBDBD',
  },
  text: {
    color: 'white',
    fontSize: 18,
    lineHeight: 21,
    fontWeight: 'normal',
  },
});
