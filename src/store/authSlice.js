import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: false,
  userData: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: () => {},
    logOut: () => {},
  },
});

export const { login, logOut } = authSlice.actions;

export default authSlice.reducer;
