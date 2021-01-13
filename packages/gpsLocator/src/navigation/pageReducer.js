import { NOT_FOUND } from 'redux-first-router';

export const components = {
  HOME: 'DashBoard',
  SET_PASSWORD: 'SetPassword',
  [NOT_FOUND]: 'NotFound',
};

export default (state = 'HOME', action = {}) => components[action.type] || state;
