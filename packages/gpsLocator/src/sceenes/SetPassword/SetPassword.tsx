import React, { FunctionComponent } from 'react';
import { StyleSheet, View, Text } from 'react-native';

interface ISetPasswordProps {
  id: string;
}

export const SetPassword: FunctionComponent<ISetPasswordProps> = ({ id }) => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text>{id}</Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  content: {
    width: '70%',
    height: '40%',
    backgroundColor: 'white',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

// const mapStateToProps = ({ location }: { location: any }) => location.payload;
// export default connect(mapStateToProps)(SetPassword);
