import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    SortBy : '',
    FilterBy :{
        sunrise : false,
        day : false,
        sunset : false,
        night : false,
        seater : false,
        sleeper : false,
        AC : false,
        NonAc : false,
    },
}

const sortAndFiltersSlice = createSlice({
    name : 'sortAndFilters',
    initialState,
    reducers : {
        setSort(state , action)
        {
            state.SortBy = action.payload;
        },
        setSunrise(state)
        {
            state.FilterBy.sunrise = !state.FilterBy.sunrise;
        },
        setDay(state)
        {
            state.FilterBy.day = !state.FilterBy.day;
        },
        setSunset(state)
        {
            state.FilterBy.sunset = !state.FilterBy.sunset;
        },
        setNight(state)
        {
            state.FilterBy.night = !state.FilterBy.night;
        },
        setSeater(state)
        {
            state.FilterBy.seater = !state.FilterBy.seater;
        },
        setSleeper(state)
        {
            state.FilterBy.sleeper = !state.FilterBy.sleeper;
        },
        setAC(state)
        {
            state.FilterBy.AC = !state.FilterBy.AC;
        },
        setNonAC(state)
        {
            state.FilterBy.NonAc = !state.FilterBy.NonAc;
        },
        setClear(state)
        {
            state.FilterBy.sunrise = false;
            state.FilterBy.day = false;
            state.FilterBy.sunset = false;
            state.FilterBy.night = false;
            state.FilterBy.seater = false;
            state.FilterBy.sleeper = false;
            state.FilterBy.AC = false;
            state.FilterBy.NonAc = false;
            state.SortBy = '';
        }
    }
});

export const sortAndFiltersActions = sortAndFiltersSlice.actions;
export default sortAndFiltersSlice.reducer;