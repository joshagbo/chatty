import {createSlice} from '@reduxjs/toolkit';

/*
*
//initial state userSlice
*
*/
const initialState = {
  error: {isError: false, message: null},
};

export const errorReducer = createSlice({
  name: 'errors',
  initialState,
  reducers: {
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const {setError} = errorReducer.actions;
export default errorReducer.reducer;
