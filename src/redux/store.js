import {configureStore} from '@reduxjs/toolkit';
import connectionReducer from './connection';
import authReducer from './auth';
import busListReducer from './BusList';

const store = configureStore({
  reducer: {
    connectionReducer,
    authReducer,
    busListReducer,
  },
});

export default store;
