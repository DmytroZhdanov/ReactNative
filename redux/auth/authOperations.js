// File with authorization operations
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { auth } from "../../firebase/config";
import { updateUserProfile, updateAuthorization, resetState, updateUserPhoto } from "./authSlice";
import { operationWrapper } from "../../utils/operationWrapper";
import { uploadPhotoToServer } from "../../utils/uploadPhotoToServer";

/**
 * Register new user and set auth state with user info
 * @param {Object} param0 Object of parameters with keys: login:<String>, email:<String>, password:<String>, image:<String>
 */
export const registerUser = ({ login, email, password, image }) =>
  operationWrapper(async (dispatch, getState) => {
    const { user } = await createUserWithEmailAndPassword(auth, email, password);

    await updateProfile(user, { displayName: login });

    const { uid, displayName } = user;

    const photoURL = image ? await uploadPhotoToServer("userPhoto", image, uid) : undefined;
    photoURL && (await updateProfile(user, { photoURL }));

    dispatch(updateUserProfile({ userId: uid, nickName: displayName, email, userPhoto: photoURL }));
  });

/**
 * Log in existing user and set auth state with user info
 * @param {Object} param0 Object of parameters with keys: email:<String>, password:<String>
 */
export const logInUser = ({ email, password }) =>
  operationWrapper(async (dispatch, getState) => {
    await signInWithEmailAndPassword(auth, email, password);
  });

/**
 * Log out user and reset auth state
 */
export const logOutUser = () =>
  operationWrapper(async (dispatch, getState) => {
    await signOut(auth);
    dispatch(resetState());
  });

/**
 * Update auth state on user authorization change
 */
export const stateChangeUser = () =>
  operationWrapper(async (dispatch, getState) => {
    await onAuthStateChanged(auth, user => {
      if (user) {
        const updatedUserProfile = {
          userId: user.uid,
          nickName: user.displayName,
          email: user.email,
          userPhoto: user.photoURL,
        };

        dispatch(updateUserProfile(updatedUserProfile));
        dispatch(updateAuthorization(true));
      } else {
        dispatch(updateAuthorization(false));
      }
    });
  });

/**
 * Update auth state with new user photo
 * @param {String} photo url to new user photo
 */
export const updateProfilePhoto = photo =>
  operationWrapper(async (dispatch, getState) => {
    await updateProfile(auth.currentUser, { photoURL: photo });
    dispatch(updateUserPhoto(photo || null));
  });
