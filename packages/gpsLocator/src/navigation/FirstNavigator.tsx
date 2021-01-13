import { connect } from 'react-redux';
import React, { FunctionComponent } from 'react';
import { Dashboard } from '../sceenes/DashBoard/DashBoard';
import SetPassword from '../sceenes/SetPassword/SetPassword';
import { components } from './pageReducer';

const mapStateToProps = ({ page }: { page: any }) => ({ page });

const FirstNavigator: FunctionComponent<{ page: any }> = ({ page }) => {
  switch (page) {
    case components.SET_PASSWORD:
      return <SetPassword />;
    default:
      return <Dashboard />;
  }
};
export default connect(mapStateToProps)(FirstNavigator);
