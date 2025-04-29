// store.js
import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counterSlice"; // Import slice reducer

 const store = configureStore({
  reducer: {
    counter: counterReducer, // Define state slice and reducer
  },
});

export default store