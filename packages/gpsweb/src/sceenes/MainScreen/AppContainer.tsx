import React, { FunctionComponent } from 'react';
import './MainScreen.scss';
import { Layout, Menu } from 'antd';
import { Route, Switch, Redirect, Link } from 'react-router-dom';

import { Yandex } from '../yandex/Yandex';
import { MainMenu } from '../MainMenu/MainMenu';
import { Login } from '../Login/Login';

const { Header, Content, Footer } = Layout;

export const AppContainer: FunctionComponent<{}> = () => {
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
        <Footer style={{ textAlign: 'center' }}>@Dmitriy&Ko</Footer>
      </Layout>
      <div className={'right-side'}>
        <MainMenu />
      </div>
    </Layout>
  );
};
