import React, { FunctionComponent } from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import NewUser from '../../../../assets/new_user.svg';

interface UserPhotoProps {
  style?: ViewStyle;
}

export const UserPhoto: FunctionComponent<UserPhotoProps> = ({ style = {} }) => {
  return (
    <View style={[styles.container, style]}>
      <NewUser width={100} height={100} />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderColor: 'blue',
    borderWidth: 1,
    overflow: 'hidden',
  },
});
