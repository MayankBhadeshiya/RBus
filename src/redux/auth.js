import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  inAuth: false,
  token: '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    changeAuth(state, action) {
      state.inAuth = action.payload;
    },
    setToken(state, action) {
      state.token = action.payload;
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
