import React, { FunctionComponent, useEffect } from 'react';
import './MainScreen.scss';
import { Layout, Menu } from 'antd';
import { get } from 'lodash';
import { Route, Switch, Redirect, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import firebase from 'firebase';
import { Yandex } from '../yandex/Yandex';
import { MainMenu } from '../MainMenu/MainMenu';
import { Login } from '../Login/Login';
import { saveFireBaseAuthData } from '../../services/firebase/actions';


const { Header, Content } = Layout;

export const AppContainer: FunctionComponent<{}> = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    firebase
      .app()
      .auth()
      .onAuthStateChanged((user) => {
        if (user === null) {
          dispatch(saveFireBaseAuthData({ isSignedIn: false, providerId: 'none', firebaseUser: null }));
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
    <Layout style={{ height: '100%', display: 'flex', flexDirection: 'row' }}>
      <Layout>
        <Header className="header">
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
            <Menu.Item key="1">
              <Link to={'/yandex'}>Yandex</Link>
            </Menu.Item>
          </Menu>
        </Header>
        <Content
          className={'site-layout-background'}
          style={{
            display: 'flex',
            height: '100%',
            flex: 1,
          }}
        >
          <Switch>
            {/* eslint-disable-next-line react/jsx-no-bind */}
            <Route exact path={'/'} render={() => <Redirect to={'/yandex'} />} />
            <Route path={'/yandex'} component={Yandex} />
            <Route path={'/login'} component={Login} />
            {/* eslint-disable-next-line react/jsx-no-bind */}
            <Route path={'*'} render={() => <div>404 NOT FOUND</div>} />
          </Switch>
        </Content>
      </Layout>
      <div className={'right-side'}>
        <MainMenu />
      </div>
    </Layout>
  );
};
