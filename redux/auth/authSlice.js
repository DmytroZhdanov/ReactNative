import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userId: null,
  nickName: null,
  isAuth: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    updateUserProfile: (state, { payload: { userId, nickName } }) => ({
      ...state,
      userId,
      nickName,
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
