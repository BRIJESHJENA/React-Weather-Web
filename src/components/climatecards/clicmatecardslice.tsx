import { createSlice, nanoid } from "@reduxjs/toolkit";

const intialeState = {
  climate: {},
  dailyClimate: {},
  hourlyClimate: {},
  error: {}
};

const climatecard = createSlice({
  name: "climate",
  initialState: intialeState,
  reducers: {
    addClimate: (state: any, action: any) => {
      const climate = {
        id: nanoid(),
        climateVal: action.payload,
      };
      state.climate = climate;
    },
    dailyClimate: (state: any, action: any) => {
      const dailyClimate = {
        id: nanoid(),
        climateVal: action.payload,
      };
      state.dailyClimate = dailyClimate;
    },
    hourlyClimate: (state: any, action: any) => {
      const hourlyClimate = {
        id: nanoid(),
        climateVal: action.payload,
      };
      state.hourlyClimate = hourlyClimate;
    },
    errorMessage: (state: any, action: any) => {
      const error = {
        id: nanoid(),
        climateVal: action.payload,
      };
      state.error = error;
    },
  },
});

export const { addClimate, dailyClimate, hourlyClimate, errorMessage } =
  climatecard.actions;

export default climatecard.reducer;
