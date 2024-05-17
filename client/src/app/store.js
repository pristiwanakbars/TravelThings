import { configureStore } from "@reduxjs/toolkit";
import hotels from "../features/hotels/hotels-slicer";

export const store = configureStore({
  reducer: {
    hotels,
  },
});
