import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { auth } from "../../firebase/config";
import { operationWrapper } from "../../utils/operationWrapper";
import { updateUserProfile, updateAuthorization, resetState } from "./authSlice";

export const registerUser = ({ login, email, password }) =>
  operationWrapper(async (dispatch, getState) => {
    const { user } = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(user, { displayName: login });

    const { uid, displayName } = user;

    dispatch(updateUserProfile({ userId: uid, nickName: displayName, email }));
  });

export const logInUser = ({ email, password }) =>
  operationWrapper(async (dispatch, getState) => {
    await signInWithEmailAndPassword(auth, email, password);
  });

export const logOutUser = () =>
  operationWrapper(async (dispatch, getState) => {
    await signOut(auth);
    dispatch(resetState());
  });

export const stateChangeUser = () =>
  operationWrapper(async (dispatch, getState) => {
    await onAuthStateChanged(auth, user => {
      if (user) {
        const updatedUserProfile = {
          userId: user.uid,
          nickName: user.displayName,
          email: user.email,
        };

        dispatch(updateUserProfile(updatedUserProfile));
        dispatch(updateAuthorization(true));
      } else {
        dispatch(updateAuthorization(false));
      }
    });
  });
