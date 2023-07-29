import {configureStore} from '@reduxjs/toolkit';
import connectionReducer from './connection';

const store = configureStore({
  reducer: {
    connectionReducer,
  },
});

export default store;
