// Firebase configuration file
import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyC-sk8O6yTLIkxQlscFF0RyXawLmQxfjGE",
  authDomain: "reactnative-ce88a.firebaseapp.com",
  databaseURL: "https://reactnative-ce88a.firebaseio.com",
  projectId: "reactnative-ce88a",
  storageBucket: "reactnative-ce88a.appspot.com",
  messagingSenderId: "1083545858229",
  appId: "1:1083545858229:web:c3216841a365f1acd70efc",
};

const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
export const db = getFirestore(app);
export const storage = getStorage(app);
