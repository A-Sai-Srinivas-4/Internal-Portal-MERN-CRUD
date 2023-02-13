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
    console.log('New state:', store.getState());
  });

// import { configureStore } from "@reduxjs/toolkit";
// import { persistReducer, persistStore } from "redux-persist";
// import { combineReducers } from "redux";
// import storage from "redux-persist/lib/storage";
// import dataReducer from "./dataSlice";
// import { createLogger } from "redux-logger";
// //import logger from 'redux-logger'
// import thunk from "redux-thunk";

// const logger = createLogger();

// const persistConfig = {
//     key: 'root',
//   storage,
//   whitelist: ['Resources'],
//   timeout: 10000, // increase the timeout to 10 seconds
// };

// const rootReducer = combineReducers({
//   Resources: dataReducer,
// });

// const persistedReducer = persistReducer(persistConfig, rootReducer);

// const store = configureStore({
//   reducer: persistedReducer,
//   middleware: [thunk, logger],
// });

// const persistor = persistStore(store);

// export { store, persistor };
