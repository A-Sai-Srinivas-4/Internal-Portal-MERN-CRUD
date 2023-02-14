import { configureStore } from "@reduxjs/toolkit";
import dataReducer from "./dataSlice";


export const store = configureStore(
  {
    reducer: {
      Data: dataReducer,
    },
  },
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);


store.subscribe(() => {
  console.log("New state:", store.getState());
});
