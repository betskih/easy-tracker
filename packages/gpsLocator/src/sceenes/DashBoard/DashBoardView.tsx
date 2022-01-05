import React, { FunctionComponent } from 'react';
import { SafeAreaView, TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { getApiURL } from '../../utilities/config';
import { getText } from '../../constants/constants';
import { UserPhoto } from './components/UserPhoto';

interface IDashboardViewProps {
  onPress: () => void;
  isRecording: boolean;
  items: { time: string; latitude: number; longitude: number; speed: number | null }[];
  onShowId: () => void;
}
export const DashboardView: FunctionComponent<IDashboardViewProps> = ({
  onPress = () => {},
  isRecording,
  onShowId,
  items,
}) => {
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.header}>
          <UserPhoto style={styles.image} />
          <View style={styles.nameBlock}>
            <Text style={styles.nameText} ellipsizeMode={'tail'} numberOfLines={1}>
              {'Bear Grills'}
            </Text>
            <TouchableOpacity style={styles.showId} onPress={onShowId}>
              <Text style={styles.showIdText}>{getText('pressToShow')}</Text>
            </TouchableOpacity>
            <Text>{`API URL: ${getApiURL()}`}</Text>
            <Text>{`Array Length: ${items.length}`}</Text>
          </View>
        </View>
        <View style={styles.infoContainer} />
        <TouchableOpacity
          onPress={onPress}
          style={[{ backgroundColor: isRecording ? '#B91C1C' : '#2F80ED' }, styles.button]}
        >
          <Text style={styles.buttonText}>{getText(isRecording ? 'endLog' : 'startLog')}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '100%',
  },
  header: { flexDirection: 'row' },
  image: { marginTop: 23, marginLeft: 32 },
  nameBlock: { flexDirection: 'column', marginTop: 20, marginLeft: 26, marginRight: 10, flex: 1 },
  nameText: {
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 24,
    lineHeight: 30,
    color: 'black',
    marginRight: 0,
  },
  showId: {
    backgroundColor: '#E0E0E0',
    height: 35,
    alignItems: 'center',
    justifyContent: 'center',
  },
  showIdText: {
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 14,
    lineHeight: 19,
    color: '#828282',
  },
  infoContainer: {
    marginLeft: 10,
    marginRight: 10,
    flexDirection: 'column',
  },
  button: {
    height: 190,
    marginRight: 30,
    marginBottom: 50,
    marginLeft: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 24,
    lineHeight: 33,
    color: 'white',
  },
});
