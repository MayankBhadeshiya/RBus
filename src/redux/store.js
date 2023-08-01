import {configureStore} from '@reduxjs/toolkit';
import connectionReducer from './connection';
import authReducer from './auth';
import sortAndFiltersReducer from './sortAndFilters';

const store = configureStore({
  reducer: {
    connectionReducer,
    authReducer,
    sortAndFiltersReducer,
  },
});

export default store;
