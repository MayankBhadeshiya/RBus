import {configureStore} from '@reduxjs/toolkit';
import connectionReducer from './connection';
import authReducer from './auth';

const store = configureStore({
  reducer: {
    connectionReducer,
    authReducer,
  },
});

export default store;
