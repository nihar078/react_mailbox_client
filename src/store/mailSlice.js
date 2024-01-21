import { createSlice } from "@reduxjs/toolkit";

const initialMailState = { sentMail: [], reciveMail: [] };
const mailSlice = createSlice({
  name: "mail",
  initialState: initialMailState,
  reducers: {
    setSentMail(state, action) {
      state.sentMail = action.payload;
    },
    setInbox(state, action) {
      state.reciveMail = action.payload;
    },
  },
});

export const mailActions = mailSlice.actions;
export default mailSlice.reducer;
