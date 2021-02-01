import React, { FunctionComponent, useCallback, useEffect, useRef } from 'react';
import './login.scss';
import firebase from 'firebase/app';
import 'firebase/auth';
import { Button } from 'semantic-ui-react';
import {Redirect, useHistory} from 'react-router';
import Icon from 'semantic-ui-react/dist/commonjs/elements/Icon';
import {useSelector} from 'react-redux';
import { Modal } from '../Modal/Modal';
import { getText } from '../../Constants/constants';
import {isUserSignedIn} from '../../services/firebase/selector';

interface ILoginProps {}

export const Login: FunctionComponent<ILoginProps> = () => {
  const authWindow = useRef(null);
  const vkScrypt = document.createElement('script');
  const history = useHistory();
  const isUserSigned = useSelector(isUserSignedIn);

  useEffect(() => {
    if (authWindow.current) {
      vkScrypt.src = 'https://vk.com/js/api/openapi.js?168';
      vkScrypt.defer = true;
      // @ts-ignore
      authWindow.current.appendChild(vkScrypt);
    }
  });

  const onClose = useCallback(() => {
    history.goBack();
  }, [history]);

  const vkLogin = useCallback(() => {
    // @ts-ignore
    VK.init({
      apiId: '7744123',
    });
    // @ts-ignore
    VK.Widgets.Auth('vk_auth', {});
  }, []);

  const googleLogin = useCallback(() => {
    const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(googleAuthProvider);
  },[]);

  return (
    <Modal>
      {isUserSigned && <Redirect to={'/'} />}
      <div className={'login-modal'} ref={authWindow}>
        <Button className={'close-button'} circular icon={'close'} primary onClick={onClose} />
        <div className={'splitter'} />
        <Button basic color="black" onClick={googleLogin} fluid>
          <Icon name="google" />
          {getText('loginGoogle')}
        </Button>
        <div className={'splitter'} />
        <Button color="vk" onClick={vkLogin} fluid>
          <Icon name="vk" />
          {getText('loginVK')}
        </Button>
        <div className={'splitter'} />
        <div id="vk_auth"></div>
      </div>
    </Modal>
  );
};
