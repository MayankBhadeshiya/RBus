import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  busId: null,
  avilbleSeat: [],
  bookedSeat: [],
  selectedSeat: [],
  PriceOfOne: null,
  Totalprice: null,
};

const busDetailSlice = createSlice({
  name: 'busDetail',
  initialState,
  reducers: {
    setBook(state, action) {
      state.bookedSeat = action.payload;
    },
    setAvlilable(state, action) {
      state.avilbleSeat = action.payload;
    },
    onselect(state, action) {
      const existingIndex = state.selectedSeat.findIndex(
        item => item === action.payload,
      );

      if (existingIndex !== -1) {
        state.selectedSeat = state.selectedSeat.filter(
          item => item !== action.payload,
        );
      } else {
        state.selectedSeat.push(action.payload);
      }
      state.Totalprice = state.selectedSeat.length * state.PriceOfOne;
    },
    setPrice(state, action) {
      state.PriceOfOne = action.payload;
    },
    setId(state, action) {
        if(state.busId !== action.payload){
            state.busId = action.payload;
            state.selectedSeat = [];
            state.Totalprice = null;
        }
    },
  },
});

export const busDetailActions = busDetailSlice.actions;
export default busDetailSlice.reducer;
