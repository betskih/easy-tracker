import React, { FunctionComponent, useCallback, useState } from 'react';
import { StyleSheet, TouchableOpacity, View, Text, ViewStyle } from 'react-native';

interface ILCheckBoxProps {
  initial?: boolean;
  onCheck?: (check: boolean) => void;
  text?: string;
  style?: ViewStyle;
}

export const LCheckBox: FunctionComponent<ILCheckBoxProps> = ({
  initial = false,
  onCheck = () => {},
  text = '',
  style = {},
}) => {
  const [checked, setChecked] = useState(initial);
  const handlePress = useCallback(() => {
    onCheck(!checked);
    setChecked(!checked);
  }, [onCheck, checked]);
  return (
    <TouchableOpacity onPress={handlePress} style={[styles.container, style]}>
      <View style={[styles.box, checked && styles.checked]} />
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  box: {
    width: 18,
    height: 18,
    borderWidth: 1,
    borderColor: '#2F80ED',
    backgroundColor: 'white',
    borderRadius: 3,
  },
  checked: {
    backgroundColor: '#2F80ED',
  },
  text: {
    color: '#000000',
    fontSize: 20,
    fontWeight: 'normal',
    lineHeight: 23,
    marginLeft: 9,
  },
});
