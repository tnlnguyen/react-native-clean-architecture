import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';

const _XHR = GLOBAL.originalXMLHttpRequest
  ? GLOBAL.originalXMLHttpRequest
  : (GLOBAL.XMLHttpRequest = GLOBAL.originalXMLHttpRequest || GLOBAL.XMLHttpRequest);
XMLHttpRequest = _XHR;

async function handleBackgroundMessage(message) {
  return Promise.resolve();
}

AppRegistry.registerComponent(appName, () => App);
