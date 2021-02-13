import React, { FunctionComponent, useCallback, useState } from 'react';
import { Layout, Menu } from 'antd';
import { MapTypes, Yandex } from '../yandex/Yandex';
import { MainMenu } from '../MainMenu/MainMenu';

interface ILocatorMapProps {}
const { Header, Content } = Layout;

export const LocatorMap: FunctionComponent<ILocatorMapProps> = () => {
  const [mapType, setMapType] = useState(MapTypes.scheme);
  const onChangeMapType = useCallback((e) => {
    switch (e.key) {
      case '1':
        setMapType(MapTypes.scheme);
        break;
      case '2':
        setMapType(MapTypes.satellite);
        break;
      case '3':
        setMapType(MapTypes.hybrid);
        break;
    }
  }, []);
  return (
    <Layout style={{ height: '100%', display: 'flex', flexDirection: 'row' }}>
      <Layout>
        <Header className="header">
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['1']}
            onClick={onChangeMapType}
          >
            <Menu.Item key="1">
              <span>Схема</span>
            </Menu.Item>
            <Menu.Item key="2">
              <span>Спутник</span>
            </Menu.Item>
            <Menu.Item key="3">
              <span>Гибрид</span>
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
          <Yandex type={mapType}/>
        </Content>
      </Layout>
      <div className={'right-side'}>
        <MainMenu />
      </div>
    </Layout>
  );
};
