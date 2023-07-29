import React from 'react';
import {Provider} from 'react-redux';
import store from './src/redux/store';
import AppNav from './src/navigation/AppNav';

function App() {

  return (
    <Provider store={store}>
      <AppNav></AppNav>
    </Provider>
  );
}

export default App;
