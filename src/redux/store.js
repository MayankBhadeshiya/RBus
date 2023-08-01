import {configureStore} from '@reduxjs/toolkit';
import connectionReducer from './connection';
import sortAndFiltersReducer from './sortAndFilters';
const store = configureStore({
  reducer: {
    connectionReducer,
    sortAndFiltersReducer,
  },
});

export default store;
