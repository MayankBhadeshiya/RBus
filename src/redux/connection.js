import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  connection: true,
  isLoading: false,
};

const connectionSlice = createSlice({
  name: 'netConnection',
  initialState,
  reducers: {
    connect(state, action) {
      state.connection = action.payload;
    },
    setLoding(state, action) {
      state.isLoading = action.payload;
    }
  },
});

export const connectionActions = connectionSlice.actions;
export default connectionSlice.reducer;
