import {configureStore} from '@reduxjs/toolkit';
import connectionReducer from './connection';
import authReducer from './auth';
import sortAndFiltersReducer from './sortAndFilters';
import busListReducer from './BusList';

const store = configureStore({
  reducer: {
    connectionReducer,
    authReducer,
    sortAndFiltersReducer,
    busListReducer,
  },
});

export default store;
