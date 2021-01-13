import React, { FunctionComponent } from 'react';
import { SafeAreaView, StyleSheet, View, Text } from 'react-native';
// import { connect } from 'react-redux';

interface ISetPasswordProps {
  id: string;
}

export const SetPassword: FunctionComponent<ISetPasswordProps> = ({ id }) => {
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Text>{id}</Text>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'red',
    width: '100%',
    height: '100%',
  },
});

// const mapStateToProps = ({ location }: { location: any }) => location.payload;
// export default connect(mapStateToProps)(SetPassword);
