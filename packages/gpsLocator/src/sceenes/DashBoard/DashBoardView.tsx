import React, { FunctionComponent } from 'react';
import { SafeAreaView, ScrollView, TouchableOpacity, View, Text } from 'react-native';
import { getApiURL } from '../../utilities/config';

interface IDashboardViewProps {
  onPress: () => void;
  isRecording: boolean;
  items: { time: string; latitude: number; longitude: number; speed: number | null }[];
}
export const DashboardView: FunctionComponent<IDashboardViewProps> = ({
  onPress = () => {},
  isRecording,
  items,
}) => {
  return (
    <SafeAreaView>
      <TouchableOpacity onPress={onPress}>
        <View style={{ backgroundColor: isRecording ? 'red' : 'blue', height: 100, width: 200 }} />
      </TouchableOpacity>
      <View style={{ height: '80%', width: '100%', marginTop: 20 }}>
        <ScrollView>
          <Text>{getApiURL()}</Text>
          {items.map((item, index) => (
            <Text key={index} children={`${item.time} - ${item.latitude} | ${item.longitude}`} />
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};
