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
    BusArrivalFilter : {
        sunrise : false,
        day : false,
        sunset : false,
        night : false,
    }
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
            state.BusArrivalFilter.sunrise = false;
            state.BusArrivalFilter.day = false;
            state.BusArrivalFilter.sunset = false;
            state.BusArrivalFilter.night = false;
        },
        setBAFsunrise(state)
        {
            state.BusArrivalFilter.sunrise = !state.BusArrivalFilter.sunrise;
        },
        setBAFday(state)
        {
            state.BusArrivalFilter.day = !state.BusArrivalFilter.day;
        },
        setBAFsunset(state)
        {
            state.BusArrivalFilter.sunset = !state.BusArrivalFilter.sunset;
        },
        setBAFnight(state)
        {
            state.BusArrivalFilter.night = !state.BusArrivalFilter.night;
        }
    }
});

export const sortAndFiltersActions = sortAndFiltersSlice.actions;
export default sortAndFiltersSlice.reducer;