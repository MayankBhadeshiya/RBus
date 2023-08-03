import {configureStore} from '@reduxjs/toolkit';
import connectionReducer from './connection';
import authReducer from './auth';
import sortAndFiltersReducer from './sortAndFilters';
import busListReducer from './BusList';
import busDetailReducer from './busDetails';

const store = configureStore({
  reducer: {
    connectionReducer,
    authReducer,
    sortAndFiltersReducer,
    busListReducer,
    busDetailReducer,
  },
});

export default store;
