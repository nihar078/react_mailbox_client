import { createSlice } from "@reduxjs/toolkit";

const initialMailState = { sentMails: [], reciveMails: [] };
const mailSlice = createSlice({
  name: "mail",
  initialState: initialMailState,
  reducers: {
    setSentMail(state, action) {
      state.sentMails = action.payload;
    },
    setInbox(state, action) {
      state.reciveMails = action.payload;
    },
    setreciveMail(state, action) {
      state.reciveMails = [...state.reciveMails, action.payload];
    },
    markAsReadSuccess(state, action) {
      state.reciveMails = state.reciveMails.map((email) =>
        email.id === action.payload.id
          ? { ...email, ...action.payload.update }
          : email
      );
    },
  },
});

export const mailActions = mailSlice.actions;
export default mailSlice.reducer;
