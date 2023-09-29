import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../firebase/config";

/**
 * Upload image to cloud database
 * @param {String} directory where to save uploaded image
 * @param {String} photoURI local path to image which has to be uploaded to server
 * @param {String} userId unique user ID
 * @returns URL of uploaded image
 */
export const uploadPhotoToServer = async (directory, photoURI, userId) => {
  const response = await fetch(photoURI);
  const file = await response.blob();
  const photoId = directory === "userPhoto" ? `${userId}` : `${userId}_${Date.now().toString()}`;
  const storageRef = ref(storage, `${directory}/${photoId}`);

  await uploadBytes(storageRef, file);

  return await getDownloadURL(storageRef);
};
