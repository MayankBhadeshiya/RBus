import {createSlice} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState = {
  inAuth: false,
  token: '',
  userDetails: {},
  ticketBookedDuringThisSession: []
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
      AsyncStorage.setItem('Token', JSON.stringify(state.token));
    },
    setUser(state, action) {
      state.userDetails = action.payload;
      AsyncStorage.setItem('User', JSON.stringify(state.userDetails));
    },
    bookedTicket(state, action) {
      state.ticketBookedDuringThisSession.push(action.payload);
    }
  },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
