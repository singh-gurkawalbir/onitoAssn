// formSlice.js
import { createSlice } from '@reduxjs/toolkit';

const formSlice = createSlice({
  name: 'form',
  initialState: {
    personalDetails: [],
    addressDetails: [],
  },
  reducers: {
    addPersonalDetails: (state, action) => {
      state.personalDetails.push(action.payload);
    },
    addAddressDetails: (state, action) => {
      state.addressDetails.push(action.payload);
    },
  },
});
export const { addPersonalDetails, addAddressDetails } = formSlice.actions;
export const selectPersonalDetails = (state) => state.form.personalDetails;
export const selectAddressDetails = (state) => state.form.addressDetails;

export default formSlice.reducer;
