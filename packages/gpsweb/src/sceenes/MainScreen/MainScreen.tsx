import React, { FunctionComponent } from 'react';
import './MainScreen.scss';
import { Yandex } from '../yandex/Yandex';
import { MainMenu } from '../MainMenu/MainMenu';

interface IMainScreen {}

export const MainScreen: FunctionComponent<IMainScreen> = () => {
  return (
    <div className={'main-screen'}>
      <div className={'left-side'}>
        <Yandex />
      </div>
      <div className={'right-side'}>
        <MainMenu />
      </div>
    </div>
  );
};
