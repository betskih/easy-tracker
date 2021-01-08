import React, { FunctionComponent } from 'react';
import './Modal.scss';

interface IModalProps {}
export const Modal: FunctionComponent<IModalProps> = ({ children }) => {
  return <div className={'modal'}>{children}</div>;
};
