import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  success: {
    isSuccess: false,
    successMessage: null,
  },
};

export const SuccessReducer = createSlice({
  name: 'success',
  initialState,
  reducers: {
    onSuccess: (state, action) => {
      state.success = action.payload;
    },
  },
});

export const {onSuccess} = SuccessReducer.actions;
export default SuccessReducer.reducer;
