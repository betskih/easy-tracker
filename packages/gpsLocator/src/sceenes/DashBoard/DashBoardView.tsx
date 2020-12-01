import React, { FunctionComponent } from 'react';
import { SafeAreaView, View } from 'react-native';

interface IDashboardViewProps {}
export const DashboardView: FunctionComponent<IDashboardViewProps> = () => {
  return (
    <SafeAreaView>
      <View style={{ backgroundColor: 'green', height: 200, width: '100%' }} />
    </SafeAreaView>
  );
};
