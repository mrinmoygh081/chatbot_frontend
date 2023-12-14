import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null,
  isLoggedIn: false,
  userId: null,
};

export const loginStage = createSlice({
  name: "loginStage",
  initialState,
  reducers: {
    loginHandler: (state, action) => {
      console.log(action, "action");
      state.token = action.payload.token;
      state.isLoggedIn = true;
      state.userId = action.payload.data.id;
    },
    logoutHandler: (state) => {
      state.token = null;
      state.isLoggedIn = false;
      state.userId = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const { loginHandler, logoutHandler } = loginStage.actions;

export default loginStage.reducer;
