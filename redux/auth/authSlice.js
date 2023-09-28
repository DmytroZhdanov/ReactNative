import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userId: null,
  nickName: null,
  email: null,
  isAuth: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    updateUserProfile: (state, { payload: { userId, nickName, email } }) => ({
      ...state,
      userId,
      nickName,
      email,
    }),
    updateAuthorization: (state, { payload }) => ({
      ...state,
      isAuth: payload,
    }),
    resetState: () => ({ ...initialState, isAuth: false }),
  },
});

export const { updateUserProfile, updateAuthorization, resetState } = authSlice.actions;

export default authSlice.reducer;
