import {configureStore} from '@reduxjs/toolkit';
import appGlobalReducer from './reducers/appGlobalReducer';

const store = configureStore({
  reducer: {
    globals: appGlobalReducer,
  },
});

export default store;
