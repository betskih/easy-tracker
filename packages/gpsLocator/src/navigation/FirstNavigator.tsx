import { connect } from 'react-redux';
import React, { FunctionComponent } from 'react';
import { Dashboard } from '../sceenes/DashBoard/DashBoard';
import { SetPassword } from '../sceenes/SetPassword/SetPassword';
import { components } from './pageReducer';

const mapStateToProps = ({ page, location }: { page: any; location: any }) => ({ page, location });

const FirstNavigator: FunctionComponent<{ page: any; location: any }> = ({ page, location }) => {
  switch (page) {
    case components.SET_PASSWORD:
      return <SetPassword {...location.payload} />;
    default:
      return <Dashboard />;
  }
};
export default connect(mapStateToProps)(FirstNavigator);
