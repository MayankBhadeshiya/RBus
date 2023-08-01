import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  routeDetails: {
    start: '',
    end: '',
    date: '',
  },
};

const busListSlice = createSlice({
  name: 'busList',
  initialState,
  reducers: {
    setRouteDetails(state, action) {
        state.routeDetails = action.payload
    }
  },
});

export const busListActions = busListSlice.actions;
export default busListSlice.reducer;
