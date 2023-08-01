import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    SortBy : '',
    FilterBy :[{
        '06:00 - 11:59' : false,
        '12:00 - 17:59' : false,
        '18:00 - 23:59' : false,
        '00:00 - 05:59' : false,
        seater : false,
        sleeper : false,
        AC : false,
        NonAc : false,
    }],
}

const sortAndFiltersSlice = createSlice({
    name : 'sortAndFilters',
    initialState,
    reducers : {
        setSort(state , action)
        {
            state.SortBy = action.payload;
        } 
    }
});

export const sortAndFiltersActions = sortAndFiltersSlice.actions;
export default sortAndFiltersSlice.reducer;