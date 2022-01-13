import {configureStore} from '@reduxjs/toolkit';
import userReducer from './reducers/userReducer';
import errorReducer from './reducers/errorReducer';
import successReducer from './reducers/successReducer';

const store = configureStore({
  reducer: {user: userReducer, error: errorReducer, success: successReducer},
});

export default store;
