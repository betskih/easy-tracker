import React, { FunctionComponent, useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import firebase from 'firebase/app';
import 'firebase/auth';
import { getUserInfo, isUserSignedIn } from '../../../services/firebase/selector';
import './UserHeader.scss';
import { UserDetails } from '../UserDetails/UserDetails';

interface IUserHeader {}

export const UserHeader: FunctionComponent<IUserHeader> = () => {
  const [details, showDetails] = useState(false);
  const isUserSigned = useSelector(isUserSignedIn);
  const userInfo = useSelector(getUserInfo);
  const handleClick = useCallback(() => {
    showDetails(!details);
  }, [details]);

  const handleLogout = useCallback(() => {
    firebase.auth().signOut();
    showDetails(!details);
  }, [details]);


  return (
    <div className={'user-header'}>
      {!isUserSigned ? (
        <Link to={'/login'}>
          <span> Login </span>
        </Link>
      ) : (
        <div className={'photo'} onClick={handleClick}>
          {userInfo.photoURL && (
            <img
              crossOrigin={'anonymous'}
              src={userInfo.photoURL}
              style={{ width: 40, height: 40 }}
            />
          )}
        </div>
      )}
      {details && <UserDetails info={userInfo} onClose={handleClick} onLogout={handleLogout} />}
    </div>
  );
};
