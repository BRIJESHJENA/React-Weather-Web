import { configureStore } from "@reduxjs/toolkit";
import clicmatecardslice from "../../components/climatecards/clicmatecardslice.tsx";

export const store = configureStore({
  reducer: clicmatecardslice,
});
