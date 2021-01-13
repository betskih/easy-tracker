/**
 * @format
 */

import { AppRegistry, Linking } from 'react-native';
import { push } from 'redux-first-router';
import App from './src/App/App';
import { name as appName } from './app.json';

Linking.getInitialURL().then(AppRegistry.registerComponent(appName, () => App));
Linking.addEventListener('url', ({ url }) => push(url));
