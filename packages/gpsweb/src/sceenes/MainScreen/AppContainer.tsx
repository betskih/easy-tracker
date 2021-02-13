import React, { FunctionComponent, useEffect } from 'react';
import './MainScreen.scss';
import { get } from 'lodash';
import { Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import firebase from 'firebase';
import { Login } from '../Login/Login';
import { saveFireBaseAuthData } from '../../services/firebase/actions';
import { LocatorMap } from '../LocatorMap/LocatorMap';

export const AppContainer: FunctionComponent<{}> = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    firebase
      .app()
      .auth()
      .onAuthStateChanged((user) => {
        if (user === null) {
          dispatch(
            saveFireBaseAuthData({ isSignedIn: false, providerId: 'none', firebaseUser: null }),
          );
          return;
        }
        if (user.providerData && user.providerData[0]) {
          dispatch(
            saveFireBaseAuthData(
              JSON.parse(
                JSON.stringify({
                  isSignedIn: true,
                  providerId: get(user, 'providerData.0.providerId', 'unknown'),
                  firebaseUser: user,
                }),
              ),
            ),
          );
        }
      });
  }, [dispatch]);
  return (
    <Switch>
      {/* eslint-disable-next-line react/jsx-no-bind */}
      <Route exact path={'/'} component={LocatorMap} />
      <Route path={'/login'} component={Login} />
      {/* eslint-disable-next-line react/jsx-no-bind */}
      <Route path={'*'} render={() => <div>404 NOT FOUND</div>} />
    </Switch>
  );
};
