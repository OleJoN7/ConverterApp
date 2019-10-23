import React from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';
import {AlertProvider} from './components/Alert';
import Navigator from './config/routes';

import {Provider} from 'react-redux';
import store from './config/store';

EStyleSheet.build({
  $primaryBlue: '#4f6d7a',
  $white: '#fff',
  $border: '#e2e2e2',
  $primaryOrange: '#D57A66',
  $primaryGreen: '#00BD9D',
  $primaryPurple: '#9E768F',
  $inputText: '#797979',
  $lightGray: '#f0f0f0',
  $darkText: '#343434',
});

export default () => (
  <Provider store={store}>
    <AlertProvider>
      <Navigator onNavigationStateChange={null} />
    </AlertProvider>
  </Provider>
);
