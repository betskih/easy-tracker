import React, { FunctionComponent } from 'react';
import { Lightbox, Router, Scene } from 'react-native-router-flux';
import { Dashboard } from '../sceenes/DashBoard/DashBoard';
import { SetPassword } from '../sceenes/SetPassword/SetPassword';

export const ROUTES = {
  dashboard: 'dashboard',
  password: 'password',
};

export const RootRouter: FunctionComponent<{}> = () => {
  return (
    <Router>
      <Lightbox key={'lightbox'}>
        <Scene key={ROUTES.dashboard} component={Dashboard} title="DashBoard" initial hideNavBar />
        <Scene key={ROUTES.password} component={SetPassword} title="SetPassword" hideNavBar />
      </Lightbox>
    </Router>
  );
};
