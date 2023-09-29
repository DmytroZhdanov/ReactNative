import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../firebase/config";

export const uploadPhotoToServer = async (directory, photoURI, userId) => {
  const response = await fetch(photoURI);
  const file = await response.blob();
  const photoId = directory === "userPhoto" ? `${userId}` : `${userId}_${Date.now().toString()}`;
  const storageRef = ref(storage, `${directory}/${photoId}`);

  await uploadBytes(storageRef, file);

  return await getDownloadURL(storageRef);
};
