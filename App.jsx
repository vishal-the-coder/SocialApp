import React from 'react';
import {Text, View} from 'react-native';
import {Provider} from 'react-redux';
import Store from './src/Store/Store';
import AppContainer from './src/Navigator/index';
import {ToastProvider} from 'react-native-toast-notifications';

const App = () => {
  return (
    <Provider store={Store}>
      <ToastProvider>
        <AppContainer />
      </ToastProvider>
    </Provider>
  );
};

export default App;
