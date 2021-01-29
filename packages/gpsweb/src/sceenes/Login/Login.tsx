import React, { FunctionComponent, useEffect, useRef } from 'react';
import './login.scss';
import { FirebaseAuthConsumer, IfFirebaseAuthed, IfFirebaseAuthedAnd } from '@react-firebase/auth';
import firebase from 'firebase/app';
import 'firebase/auth';
import { useDispatch } from 'react-redux';
import { Modal } from '../Modal/Modal';
import { saveFireBaseAuthData } from '../../services/firebase/actions';

interface ILoginProps {}

export const Login: FunctionComponent<ILoginProps> = () => {
  const authWindow = useRef(null);
  const vkScrypt = document.createElement('script');
  const dispatch = useDispatch();
  useEffect(() => {
    if (authWindow.current) {
      vkScrypt.src = 'https://vk.com/js/api/openapi.js?168';
      vkScrypt.defer = true;
      // @ts-ignore
      authWindow.current.appendChild(vkScrypt);
    }
  });

  return (
    <Modal>
      <div className={'login-modal'} ref={authWindow}>
        <button
          onClick={() => {
            const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
            firebase.auth().signInWithPopup(googleAuthProvider);
          }}
        >
          Sign In with Google
        </button>
        <button
          data-testid="signin-anon"
          onClick={() => {
            firebase.auth().signInAnonymously();
          }}
        >
          Sign In Anonymously
        </button>
        <button
          onClick={() => {
            firebase.auth().signOut();
          }}
        >
          Sign out
        </button>
        <button
          onClick={() => {
            // @ts-ignore
            VK.init({
              apiId: '7744123',
            });
            // @ts-ignore
            VK.Widgets.Auth('vk_auth', {});
          }}
        >
          VK
        </button>
        <div id="vk_auth"></div>
        <FirebaseAuthConsumer>
          {({ isSignedIn, user, providerId }) => {
            user &&
              dispatch(
                saveFireBaseAuthData(
                  JSON.parse(JSON.stringify({ isSignedIn, firebaseUser: user, providerId })),
                ),
              );
            // user && dispatch(saveFireBaseAuthData('text'));
            return (
              <pre style={{ height: 300, overflow: 'auto' }}>
                {JSON.stringify({ isSignedIn, user, providerId }, null, 2)}
              </pre>
            );
          }}
        </FirebaseAuthConsumer>
        <div>
          <IfFirebaseAuthed>
            {() => {
              return <div>You are authenticated</div>;
            }}
          </IfFirebaseAuthed>
          <IfFirebaseAuthedAnd filter={({ providerId }) => providerId !== 'anonymous'}>
            {({ providerId }) => {
              return <div>You are authenticated with {providerId}</div>;
            }}
          </IfFirebaseAuthedAnd>
        </div>
      </div>
    </Modal>
  );
};
