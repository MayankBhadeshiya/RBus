import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    SortBy : [{
        price_LowToHigh : false,
        best_Rated_First : false,
        early_departure : false,
        late_departure : false,
    }],
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
    reducers : ''
})