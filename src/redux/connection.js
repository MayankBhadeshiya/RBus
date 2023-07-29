import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  connection: true,
};

const connectionSlice = createSlice({
  name: 'netConnection',
  initialState,
  reducers: {
    connect(state, action) {
      state.connection = action.payload;
    },
  },
});

export const connectionActions = connectionSlice.actions;
export default connectionSlice.reducer;
