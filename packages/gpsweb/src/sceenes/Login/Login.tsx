import React, { FunctionComponent } from 'react';
import './login.scss';
import { Modal } from '../Modal/Modal';

interface ILoginProps {}

export const Login: FunctionComponent<ILoginProps> = () => {
  return(
     <Modal>
          <div className={'login-modal'}>
            <span>Авторизация</span>
          </div>
    </Modal>);
};
