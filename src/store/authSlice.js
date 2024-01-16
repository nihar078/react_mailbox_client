import { createSlice } from "@reduxjs/toolkit";

const localState = JSON.parse(localStorage.getItem("tokenData"));
const initialAuthState = {
  token: localState ? localState.token : "",
  email: localState ? localState.email : "",
  isLoggedIn: localState ? !!localState.token : "",
};
// console.log(initialAuthState);

const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    login(state, action) {
      state.token = action.payload.token;
      state.email = action.payload.email;
      state.isLoggedIn = true;
      localStorage.setItem("tokenData", JSON.stringify(action.payload));
    },
    logout(state, action) {
      state.token = "";
      state.email = "";
      state.isLoggedIn = false;
      localStorage.removeItem("tokenData");
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
