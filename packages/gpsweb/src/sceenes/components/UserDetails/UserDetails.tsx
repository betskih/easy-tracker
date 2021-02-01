import React, { FunctionComponent, useCallback } from 'react';
import { Button } from 'semantic-ui-react';
import './UserDetails.scss';

import { UserInfo } from '../../../services/firebase/types';
import { getText } from '../../../Constants/constants';

interface IUserDetails {
  onClose?: () => void;
  onLogout?: () => void;
  info: UserInfo;
}

export const UserDetails: FunctionComponent<IUserDetails> = ({
  onClose = () => {},
  onLogout = () => {},
  info,
}) => {
  const { photoURL, displayName, email } = info;
  const stopFlowUp = useCallback((e) => {
    e.stopPropagation();
  }, []);
  return (
    <div className={'details-container'} onClick={onClose}>
      <div className={'user-details'} onClick={stopFlowUp}>
        {photoURL && (
          <div className={'photo'}>
            <img crossOrigin={'anonymous'} src={info.photoURL} style={{ width: 80, height: 80 }} />
          </div>
        )}
        {displayName && <span className={'user-name'}>{displayName}</span>}
        {email && <span className={'user-mail'}>{email}</span>}
        <Button content={getText('logout')} basic onClick={onLogout} />
      </div>
    </div>
  );
};
