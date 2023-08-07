import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  bus_id: null,
  busName: '',
  booked_seats: [],
  email: '',
  phone_number: '',
  amount: null,
  startingPoint: '',
  endingPoint: '',
  arrivalTime: '',
  departureTime: '',
};

const seatBookingSlice = createSlice({
  name: 'seatBooking',
  initialState,
  reducers: {
    onSelect(state, action) {
      state.bus_id = action.payload.bus_id;
      state.email = action.payload.email;
      state.amount = action.payload.amount;
      state.booked_seats = action.payload.booked_seats;
      state.startingPoint = action.payload.startingPoint;
      state.endingPoint = action.payload.endingPoint;
      state.phone_number = action.payload.phone_number;
      state.busName = action.payload.busName;
      state.departureTime = action.payload.departureTime;
      state.arrivalTime = action.payload.arrivalTime;
    },
    setClear(state) {
      state.bus_id = null;
      state.busName = '';
      state.booked_seats = [];
      state.email = '';
      state.phone_number = '';
      state.amount = null;
      state.startingPoint = '';
      state.endingPoint = '';
      state.arrivalTime = '';
      state.departureTime = '';
      state = initialState;
    },
  },
});

export const seatBookingActions = seatBookingSlice.actions;
export default seatBookingSlice.reducer;
