import React, { FunctionComponent, useCallback } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { noop } from 'lodash';
import { Dashboard } from '../sceenes/DashBoard/DashBoard';
import { setTopLevelNavigator } from './NavigationService';
import { ROUTES } from './routes';
import { AuthStackParamList, ModalStackParamList } from './types';

const ModalStackNavigator = createStackNavigator<ModalStackParamList>();
const ModalStackNavigatorScreen = () => {
  return (
    <ModalStackNavigator.Navigator
      headerMode={'none'}
      screenOptions={{
        cardStyle: { backgroundColor: 'transparent' },
        cardOverlayEnabled: true,
        cardStyleInterpolator: ({ current: { progress } }) => ({
          cardStyle: {
            opacity: progress.interpolate({
              inputRange: [0, 0.5, 0.9, 1],
              outputRange: [0, 0.25, 0.7, 1],
            }),
          },
          overlayStyle: {
            opacity: progress.interpolate({
              inputRange: [0, 1],
              outputRange: [0, 0.5],
              extrapolate: 'clamp',
            }),
          },
        }),
      }}
      mode={'modal'}
      initialRouteName={''}
    >
      {/*<ModalStackNavigator.Screen name={MODAL_ROUTES.MODAL_MESSAGE} component={ModalMessage} />*/}
    </ModalStackNavigator.Navigator>
  );
};

const AuthStackNavigator = createStackNavigator<AuthStackParamList>();
const AuthStackNavigatorScreen = ({ isAuth }: { isAuth: boolean }) => {
  const initialRouteName = ROUTES.DASHBOARD;
  return (
    <AuthStackNavigator.Navigator
      initialRouteName={initialRouteName}
      headerMode={'none'}
      screenOptions={{
        animationEnabled: false,
      }}
    >
      <AuthStackNavigator.Screen name={ROUTES.DASHBOARD} component={Dashboard} />
    </AuthStackNavigator.Navigator>
  );
};

export const RootNavigator: FunctionComponent<{}> = () => {
  const navRef = useCallback((ref) => {
    setTopLevelNavigator(ref);
    if (ref) {
      noop;
    }
  }, []);

  return (
    <NavigationContainer
      ref={navRef}
      children={<AuthStackNavigatorScreen isAuth={true} />}
      documentTitle={{ enabled: false }}
    />
  );
};
