import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userId: null,
  nickName: null,
  email: null,
  userPhoto: null,
  isAuth: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    updateUserProfile: (state, { payload: { userId, nickName, email, userPhoto } }) => ({
      ...state,
      userId,
      nickName,
      email,
      userPhoto,
    }),
    updateAuthorization: (state, { payload }) => ({
      ...state,
      isAuth: payload,
    }),
    resetState: () => ({ ...initialState, isAuth: false }),
    updateUserPhoto: (state, { payload }) => ({
      ...state,
      userPhoto: payload,
    }),
  },
});

export const { updateUserProfile, updateAuthorization, resetState, updateUserPhoto } =
  authSlice.actions;

export default authSlice.reducer;
